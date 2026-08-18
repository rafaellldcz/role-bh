import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const MAX_FILE_SIZE_BYTES = 1024 * 1024;
const MAX_GIT_OUTPUT_BYTES = 16 * 1024 * 1024;

const binaryExtensions = new Set([
  '.7z',
  '.aab',
  '.apk',
  '.avi',
  '.bin',
  '.bmp',
  '.class',
  '.dll',
  '.dylib',
  '.eot',
  '.exe',
  '.gif',
  '.gz',
  '.ico',
  '.jar',
  '.jpeg',
  '.jpg',
  '.mov',
  '.mp3',
  '.mp4',
  '.otf',
  '.pdf',
  '.png',
  '.so',
  '.tar',
  '.ttf',
  '.webm',
  '.webp',
  '.woff',
  '.woff2',
  '.zip',
]);

const privateKeyHeaderPattern = new RegExp(
  ['-{5}BEGIN ', '(?:(?:RSA|EC|DSA|OPENSSH|PGP|ENCRYPTED) )?', 'PRIVATE KEY-{5}'].join(''),
  'u',
);

const githubTokenPattern = new RegExp(
  `\\b${['g', 'h', '[pousr]', '_'].join('')}[A-Za-z0-9]{36,255}\\b`,
  'u',
);

const npmTokenPattern = new RegExp(`\\b${['n', 'p', 'm', '_'].join('')}[A-Za-z0-9]{36}\\b`, 'u');

/** @typedef {{ path: string, line: number, category: string }} Finding */
/** @typedef {{ category: string, pattern: RegExp }} Signature */

/** @type {Signature[]} */
const signatures = [
  { category: 'private-key-header', pattern: privateKeyHeaderPattern },
  { category: 'github-token', pattern: githubTokenPattern },
  { category: 'npm-token', pattern: npmTokenPattern },
];

/**
 * @param {string} filePath
 * @returns {boolean}
 */
function isSensitiveEnvPath(filePath) {
  const name = path.basename(filePath).toLowerCase();
  return name === '.env' || (name.startsWith('.env.') && name !== '.env.example');
}

/**
 * @param {Buffer} buffer
 * @returns {boolean}
 */
function isProbablyBinary(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
  let suspiciousBytes = 0;

  for (const byte of sample) {
    if (byte === 0) {
      return true;
    }

    if ((byte < 7 || (byte > 13 && byte < 32)) && byte !== 27) {
      suspiciousBytes += 1;
    }
  }

  return sample.length > 0 && suspiciousBytes / sample.length > 0.1;
}

/**
 * @param {string} filePath
 * @param {string} text
 * @returns {Finding[]}
 */
function scanText(filePath, text) {
  /** @type {Finding[]} */
  const findings = [];
  const lines = text.split(/\r?\n/u);

  for (const [index, line] of lines.entries()) {
    for (const signature of signatures) {
      if (signature.pattern.test(line)) {
        findings.push({
          path: filePath,
          line: index + 1,
          category: signature.category,
        });
      }
    }
  }

  return findings;
}

/**
 * @param {string} filePath
 * @returns {Finding[]}
 */
function scanFile(filePath) {
  /** @type {Finding[]} */
  const findings = [];

  if (isSensitiveEnvPath(filePath)) {
    findings.push({ path: filePath, line: 1, category: 'environment-file' });
  }

  if (binaryExtensions.has(path.extname(filePath).toLowerCase())) {
    return findings;
  }

  const absolutePath = path.resolve(filePath);
  const fileStats = statSync(absolutePath);

  if (!fileStats.isFile() || fileStats.size > MAX_FILE_SIZE_BYTES) {
    return findings;
  }

  const buffer = readFileSync(absolutePath);
  if (isProbablyBinary(buffer)) {
    return findings;
  }

  return findings.concat(scanText(filePath, buffer.toString('utf8')));
}

/**
 * @returns {string[]}
 */
function listCandidateFiles() {
  const output = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    {
      encoding: 'utf8',
      maxBuffer: MAX_GIT_OUTPUT_BYTES,
      windowsHide: true,
    },
  );

  return [...new Set(output.split('\0').filter(Boolean))].sort();
}

/**
 * @param {Finding} finding
 * @returns {string}
 */
function formatFinding(finding) {
  return `${finding.path}:${finding.line}: ${finding.category}`;
}

function runScan() {
  const files = listCandidateFiles();
  const findings = files.flatMap(scanFile);

  if (findings.length > 0) {
    console.error('Sensitive material detected:');
    for (const finding of findings) {
      console.error(formatFinding(finding));
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Secret check passed: ${files.length} candidate files inspected.`);
}

function runSelfTest() {
  const privateKeyFixture = [
    '-----BEGIN ',
    'PRIVATE KEY-----',
    '\nsynthetic-test-material\n',
    '-----END ',
    'PRIVATE KEY-----',
  ].join('');
  const githubTokenFixture = ['g', 'h', 'p_', 'A'.repeat(36)].join('');
  const npmTokenFixture = ['n', 'p', 'm_', 'B'.repeat(36)].join('');

  const fixtures = [
    {
      path: 'private-key.fixture',
      content: privateKeyFixture,
      category: 'private-key-header',
    },
    {
      path: 'github-token.fixture',
      content: githubTokenFixture,
      category: 'github-token',
    },
    {
      path: 'npm-token.fixture',
      content: npmTokenFixture,
      category: 'npm-token',
    },
  ];

  const findings = fixtures.flatMap((fixture) => scanText(fixture.path, fixture.content));
  const categories = new Set(findings.map((finding) => finding.category));

  for (const fixture of fixtures) {
    if (!categories.has(fixture.category)) {
      throw new Error(`Self-test failed for category: ${fixture.category}`);
    }
  }

  if (scanText('benign.fixture', 'This content is safe for source control.').length !== 0) {
    throw new Error('Self-test produced a false positive for benign content.');
  }

  if (!isSensitiveEnvPath('.env.local') || isSensitiveEnvPath('.env.example')) {
    throw new Error('Self-test failed for environment file handling.');
  }

  const renderedOutput = findings.map(formatFinding).join('\n');
  if (fixtures.some((fixture) => renderedOutput.includes(fixture.content))) {
    throw new Error('Self-test exposed synthetic sensitive material.');
  }

  console.log(
    'Secret check self-test passed: private key and token signatures detected, benign content ignored, no values exposed.',
  );
}

const args = process.argv.slice(2);

try {
  if (args.length === 0) {
    runScan();
  } else if (args.length === 1 && args[0] === '--self-test') {
    runSelfTest();
  } else {
    console.error('Usage: node scripts/check-secrets.mjs [--self-test]');
    process.exitCode = 2;
  }
} catch {
  console.error('Secret check failed because of an operational error.');
  process.exitCode = 2;
}

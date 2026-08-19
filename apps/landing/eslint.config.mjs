import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import rootConfig from '../../eslint.config.mjs';

const landingConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

const eslintConfig = process.cwd() === import.meta.dirname ? landingConfig : rootConfig;

export default eslintConfig;

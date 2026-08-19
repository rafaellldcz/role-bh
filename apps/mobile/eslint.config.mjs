import { defineConfig, globalIgnores } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat.js';

import rootConfig from '../../eslint.config.mjs';

const mobileConfig = defineConfig([
  expoConfig,
  globalIgnores(['.expo/**', 'dist/**', 'expo-env.d.ts']),
]);

const eslintConfig = process.cwd() === import.meta.dirname ? mobileConfig : rootConfig;

export default eslintConfig;

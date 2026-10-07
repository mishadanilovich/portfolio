import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // eslint-config-next уже регистрирует плагин jsx-a11y, но включает всего 6 правил.
  // Берём из его recommended только rules (сам плагин повторно объявлять нельзя):
  // нужны click-events-have-key-events и interactive-supports-focus — по SPEC §11
  // каждый кликабельный объект сцены обязан работать с клавиатуры.
  {
    name: 'jsx-a11y/recommended-rules',
    rules: jsxA11y.flatConfigs.recommended.rules,
  },

  // Последним: снимает правила, конфликтующие с Prettier.
  prettier,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
    // эталонные макеты — не наш код
    'design/mockups/**',
  ]),
]);

export default eslintConfig;

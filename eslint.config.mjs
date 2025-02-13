import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체 구현
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FlatCompat 초기화
const compat = new FlatCompat({
  baseDirectory: __dirname, // __dirname을 기준으로 extends 처리
  recommendedConfig: js.configs.recommended,
});

const config = [
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ),

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: path.join(__dirname, './tsconfig.json'), // tsconfig.json 경로를 절대 경로로 설정
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',

      // prefer-const 적용 (let 대신 const 사용 강제)
      'prefer-const': 'error',

      // let 사용을 기본적으로 금지하지만, for 문에서는 허용
      // var 사용 금지
      'no-restricted-syntax': [
        'error',
        {
          selector: 'VariableDeclaration[kind="let"]:not(ForStatement > VariableDeclaration)',
          message: 'Do not use let. Use const instead.',
        },
        {
          selector: 'VariableDeclaration[kind="var"]',
          message: 'Do not use var. Use const instead.',
        },
      ],

      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z0-9]+',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          filter: {
            regex: '^CE_',
            match: false,
          },
          custom: {
            regex: '^T[A-Z]+',
            match: true,
          },
        },
      ],
      '@typescript-eslint/member-delimiter-style': [
        'off',
        {
          multiline: {
            delimiter: 'none',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          args: 'after-used',
        },
      ],
      // '@typescript-eslint/ban-types': [
      //   'error',
      //   {
      //     extendDefaults: true,
      //     types: {
      //       Object: false,
      //     },
      //   },
      // ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
  {
    files: ['src/**/CE_*.ts'],
    rules: {
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // spec.ts 파일에서는 let 사용 가능하도록 설정 (오버라이드)
  {
    files: ['**/*spec.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'VariableDeclaration[kind="var"]',
          message: 'Do not use var. Use const instead.',
        },
      ], // let 사용은 허용하지만 var는 계속 금지
    },
  },
];

export default config;

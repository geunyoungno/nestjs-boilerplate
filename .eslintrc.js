module.exports = {
  // 파서 설정: TypeScript ESLint 파서 사용
  parser: '@typescript-eslint/parser',
  // 파서 옵션 설정
  parserOptions: {
    project: './tsconfig.build.json', // 프로젝트 설정 파일 경로
    sourceType: 'module', // ECMAScript 모듈 사용
    tsconfigRootDir: __dirname, // tsconfig.json 파일의 루트 디렉터리 설정
    createDefaultProgram: true, // 자동 프로그램 생성 옵션
    ecmaVersionn: 2020, // ECMAScript 버전 설정
  },
  // 플러그인 설정: TypeScript ESLint 플러그인, Prettier 플러그인 사용
  plugins: ['@typescript-eslint/eslint-plugin', '@typescript-eslint', 'prettier'],
  // 확장 설정: TypeScript ESLint 추천 설정, Prettier 추천 설정, ESLint 추천 설정, TypeScript ESLint 및 플러그인 추천 설정
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  // 루트 설정: 현재 ESLint 설정이 최상위 설정임을 나타냄
  root: true,
  // 환경 설정: 노드 및 Jest 환경 설정
  env: {
    node: true, // Node.js 환경
    jest: true, // Jest 테스트 환경
  },
  // 무시 패턴 설정: .eslintrc.js 파일 및 dist 디렉터리 무시
  ignorePatterns: [
    '.eslintrc.js',
    'dist/**/*',
    // TODO: tsconfig의 exclude 에 설정되어 있는데 왜 적용 안되는지 확인 필요
    '**/*spec.ts',
  ],
  // 규칙 설정
  rules: {
    // TypeScript 네이밍 규칙 설정: 인터페이스는 PascalCase 형식, T로 시작하는 형식 별칭은 PascalCase 형식으로 지정
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface', // 인터페이스 선택자
        format: ['PascalCase'], // PascalCase 형식 사용
        custom: {
          regex: '^I[A-Z0-9]+', // 정규식 패턴 설정
          match: true, // 정규식과 일치 여부 설정
        },
      },
      {
        selector: 'typeAlias', // 형식 별칭 선택자
        format: ['PascalCase'], // PascalCase 형식 사용
        custom: {
          regex: '^T[A-Z]+', // 정규식 패턴 설정
          match: true, // 정규식과 일치 여부 설정
        },
      },
    ],
    // 멤버 구분자 스타일 설정: 멀티라인은 구분자 없음, 싱글라인은 세미콜론으로 구분
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none', // 멀티라인 구분자 설정
          requireLast: true, // 마지막 멤버 후 구분자 필요 여부 설정
        },
        singleline: {
          delimiter: 'semi', // 싱글라인 구분자 설정
          requireLast: false, // 마지막 멤버 후 구분자 필요 여부 설정
        },
      },
    ],
    // 배열 형식 설정 규칙 비활성화
    '@typescript-eslint/array-type': [
      'off',
      {
        default: 'array-simple', // 기본 배열 형식 설정
        'read-only': 'array-simple', // 읽기 전용 배열 형식 설정
      },
    ],
    // 최대 길이 설정: 코드 최대 길이는 120자, 주석, 템플릿 리터럴, 문자열은 무시
    'max-len': [
      'error',
      {
        code: 120, // 코드 최대 길이 설정
        ignoreComments: true, // 주석 무시 설정
        ignoreTemplateLiterals: true, // 템플릿 리터럴 무시 설정
        ignoreStrings: true, // 문자열 무시 설정
      },
    ],
    // 사용되지 않는 변수 규칙 설정: 밑줄로 시작하는 변수는 무시
    '@typescript-eslint/no-unused-vars': [
      1, // 경고 수준 설정
      {
        argsIgnorePattern: '^_', // 함수 인자 무시 패턴 설정
        varsIgnorePattern: '^_', // 변수 무시 패턴 설정
        caughtErrorsIgnorePattern: '^_', // 잡힌 오류 무시 패턴 설정
        args: 'after-used', // 사용된 후에 함수 인자 설정
      },
    ],
    // TypeScript 내장된 형식 사용 금지 규칙 설정
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true, // 기본 설정 확장
        types: {
          Object: false, // Object 형식 사용 금지 설정
        },
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
  },
  overrides: [
    {
      files: ['src/**/CE_*.ts'],
      rules: {
        '@typescript-eslint/no-redeclare': ['off'],
        '@typescript-eslint/naming-convention': ['off'],
      },
    },
  ],
};

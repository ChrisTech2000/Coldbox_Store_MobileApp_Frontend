module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-native'],
  rules: {
    'prettier/prettier': 'error',
    'max-lines': ['error', { max: 500 }],

    // TypeScript
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',

    // React
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/prop-types': 'off',

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

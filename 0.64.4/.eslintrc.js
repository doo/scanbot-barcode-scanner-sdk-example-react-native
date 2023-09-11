module.exports = {
  root: true,
  extends: '@react-native-community',
  extends: ['@doo/eslint-config/react'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
  },
};
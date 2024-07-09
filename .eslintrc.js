module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        bracketSpacing: false,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
      },
    ],
  },
};

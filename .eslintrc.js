module.exports = {
  root: true,
  ignorePatterns: ['src/codeSnippets/*'],
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

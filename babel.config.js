module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '#screens': './src/screens',
          '#ui': './src/ui',
          '#hooks': './src/hooks',
          '#services': './src/services',
          '#common': './src/common',
          '#navigation': './src/navigation',
          '#assets': './src/assets',
          '#i18n': './src/i18n',
          '#types': './src/types',
          '#stores': './src/stores',
          '#constants': './src/constants',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};

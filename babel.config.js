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
          '#services': './src/services',
          '#common': './src/common',
          '#navigation': './src/navigation',
          '#assets': './src/assets',
          '#types': './src/types',
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

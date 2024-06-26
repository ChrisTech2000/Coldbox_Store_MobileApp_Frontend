module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
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

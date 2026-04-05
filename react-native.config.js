module.exports = {
  project: {
    ios: {},
    android: {
      packageName: 'com.manamuz.coldboxstore',
    },
  },
  assets: ['./src/assets/images/', './src/assets/icons/', './src/assets/fonts/'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};

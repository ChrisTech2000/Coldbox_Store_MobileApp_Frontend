// eslint-disable-next-line
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// eslint-disable-next-line
const path = require('path');

// eslint-disable-next-line
const { withSentryConfig } = require('@sentry/react-native/metro');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
    },
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    extraNodeModules: {
      'react-native-fs': path.resolve(__dirname, 'src/shims/react-native-fs.ts'),
    },
  },
};

module.exports = withSentryConfig(mergeConfig(defaultConfig, config));

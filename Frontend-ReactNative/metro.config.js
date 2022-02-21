// Hayden Stegman
// Adds the 'cjs' extension to Expo.
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
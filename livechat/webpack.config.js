const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  // Other Webpack configuration...
  plugins: [
    new WebpackAssetsManifest({
      output: 'webpack-stats.json',  // Ensure this file is generated
    }),
  ],
};

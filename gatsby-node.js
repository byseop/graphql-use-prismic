const path = require('path');

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@modules': path.resolve(__dirname, 'src/modules'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@types': path.resolve(__dirname, 'src/types')
      }
    }
  });
};

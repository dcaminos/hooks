const CracoLessPlugin = require("craco-less-plugin");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const rawLoader = require('craco-raw-loader')


module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyVars: {
          hack: `true;@import "${require.resolve(
            "./src/assets/less/yoda-theme.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
    {
      plugin: new MonacoWebpackPlugin({
        languages: ['json']
      })
    },
    { 
      plugin: rawLoader,
      rules: [
        {
          test: /\.txt$/i,
          use: 'raw-loader',
        },
      ],
      options: { test: /\.frag$/ }
    },
  ],
};
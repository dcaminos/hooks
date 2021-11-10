const CracoLessPlugin = require("craco-less-plugin");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const rawLoader = require('craco-raw-loader')
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

module.exports = {
  webpack: {
    plugins: [
      // Remove warnings from include typescript.js (solution here: https://github.com/elastic/apm-agent-nodejs/issues/1154)
      new FilterWarningsPlugin({
          exclude: /Critical dependency: the request of a dependency is an expression/
      }),
      new FilterWarningsPlugin({
        exclude: /Can't resolve 'perf_hooks'/
    })
    ]
  },
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
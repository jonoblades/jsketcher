const path = require('path');
const generateCSSScopedName = require('../../build/cssScoopeGenerator')();

const ROOT = path.resolve(__dirname, '../..');
const WEB_APP = path.join(ROOT, 'web/app');
const MODULES = path.join(ROOT, 'modules');
const NODE_MODULES = path.join(ROOT, 'node_modules');
const TESTS = path.join(ROOT, 'test');
const GLOBAL_CSS = path.join(ROOT, 'web/css');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  externals: {'verb-nurbs': 'verb'},
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [MODULES, 'node_modules', WEB_APP]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: [MODULES, WEB_APP, TESTS]
      },
      {
        test: /\.css$/,
        include: [GLOBAL_CSS, TESTS],
        use: ['style-loader', 'css-loader?-url']
      },
      {
        test: /\.css$/,
        include: [NODE_MODULES],
        use: ['style-loader', 'css-loader']
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            include: [path.join(MODULES, 'ui/styles/global')],
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.css$/,
            include: [MODULES, WEB_APP],
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    getLocalIdent: (context, localIdentName, localName) =>
                      generateCSSScopedName(localName, context.resourcePath)
                  },
                  url: false
                }
              }
            ]
          }
        ]
      },
      {
        test: /\.wasm$/,
        type: 'javascript/auto',
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['url-loader']
      }
    ]
  },
  node: {__dirname: true}
};
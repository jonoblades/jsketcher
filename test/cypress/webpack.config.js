import path from 'node:path';
import createCSSScopedName from '../../build/cssScoopeGenerator.js';

const ROOT = path.resolve(import.meta.dirname, '../..');
const WEB_APP = path.join(ROOT, 'web/app');
const MODULES = path.join(ROOT, 'modules');
const NODE_MODULES = path.join(ROOT, 'node_modules');
const TESTS = path.join(ROOT, 'test');
const GLOBAL_CSS = path.join(ROOT, 'web/css');
const generateCSSScopedName = createCSSScopedName();
const styleLoader = 'style-loader';

export default {
  mode: 'development',
  devtool: 'source-map',
  externals: {'verb-nurbs': 'verb'},
  resolve: {
    alias: {'numeric$': path.join(ROOT, 'web/lib/numeric-1.2.6.js')},
    fullySpecified: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [MODULES, 'node_modules', WEB_APP]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [MODULES, WEB_APP, TESTS],
        resolve: {fullySpecified: false},
        loader: 'esbuild-loader',
        options: {loader: 'tsx', target: 'es2022'}
      },
      {
        test: /\.jsx?$/,
        include: [MODULES, WEB_APP, TESTS],
        resolve: {fullySpecified: false},
        loader: 'esbuild-loader',
        options: {loader: 'jsx', target: 'es2022'}
      },
      {
        test: /\.css$/,
        include: [GLOBAL_CSS, TESTS, path.join(MODULES, 'ui/styles/global')],
        use: [styleLoader, {loader: 'css-loader', options: {url: false}}]
      },
      {
        test: /\.css$/,
        include: [MODULES, WEB_APP],
        exclude: [path.join(MODULES, 'ui/styles/global')],
        use: [
          styleLoader,
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
      },
      {
        test: /\.css$/,
        include: [NODE_MODULES],
        use: [styleLoader, 'css-loader']
      },
      {test: /\.wasm$/, type: 'asset/resource'},
      {test: /\.svg$/, type: 'asset/source'},
      {test: /\.(png|jpg|gif)$/i, type: 'asset'}
    ]
  }
};

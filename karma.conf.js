var path = require('path');

var include = [
  path.resolve('./app')
];

var preLoaders = [
  {test: /\.js$/, loader: 'babel', include: include}
];

var loaders = [
  {
    test: /\.scss$/,
    loader: 'style!css!sass'
  },
  {
    test: /\.html/,
    loader: 'raw'
  },
  { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

  // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
  // loads bootstrap's css.
  { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
  { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff2" },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
];


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      './app/**/*.js',
      './test/**/*.js'
    ],
    webpack: {
      devtool: 'eval',
      module: {
        loaders: loaders,
        preLoaders: preLoaders
      },
      cache: true
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    preprocessors: {
      './app/app.js': ['webpack']
    },
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-phantomjs-launcher")
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
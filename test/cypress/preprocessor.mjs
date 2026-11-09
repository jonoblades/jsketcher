import path from 'node:path';
import webpack from 'webpack';

export default function createPreprocessor(webpackOptions) {
  return file => new Promise((resolve, reject) => {
    webpack({
      ...webpackOptions,
      entry: file.filePath,
      output: {
        ...webpackOptions.output,
        path: path.dirname(file.outputPath),
        filename: path.basename(file.outputPath)
      }
    }, (error, stats) => {
      if (error) {
        reject(error);
      } else if (!stats) {
        reject(new Error('Webpack did not return compilation results'));
      } else if (stats.hasErrors()) {
        reject(new Error(stats.toString({all: false, errors: true, errorDetails: true})));
      } else {
        resolve(file.outputPath);
      }
    });
  });
}

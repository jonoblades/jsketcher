import {defineConfig, normalizePath} from 'vite';
import {transformAsync} from '@babel/core';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {readFile, readdir, mkdir, writeFile, copyFile, cp} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {execFileSync} from 'node:child_process';

const require = createRequire(import.meta.url);
const glob = require('glob');
const Handlebars = require('handlebars');
const {marked} = require('marked');
const root = path.dirname(fileURLToPath(import.meta.url));
const web = path.join(root, 'web');
const modules = path.join(root, 'modules');
const app = path.join(web, 'app');
const libAssets = require('./build/libAssets');
const scopedName = require('./build/cssScoopeGenerator')();
const docsSource = path.join(modules, 'workbenches');
const docsPattern = '*/features/*/docs/**/*';
const aliases = [];
for (const directory of [modules, app]) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    if (entry.isDirectory() && !aliases.some(alias => alias.find === entry.name)) {
      aliases.push({find: entry.name, replacement: normalizePath(path.join(directory, entry.name))});
    }
  }
}

function legacySources() {
  return {
    name: 'jsketcher-legacy-sources',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (source === 'verb-nurbs') return '\0verb-nurbs';
      if (source.startsWith('raw-loader!')) return '\0raw:' + path.resolve(path.dirname(importer), source.slice('raw-loader!'.length));
      if (/\.css$/.test(source) && importer) {
        const resolved = await this.resolve(source, importer, {skipSelf: true});
        if (resolved && [modules, app].some(directory => resolved.id.startsWith(normalizePath(directory) + '/')) &&
            !resolved.id.includes('/ui/styles/global/')) {
          return resolved.id + '?legacy.module.css';
        }
      }
    },
    async load(id) {
      if (id === '\0verb-nurbs') return 'export default window.verb;';
      if (id.startsWith('\0raw:')) {
        const filename = id.slice('\0raw:'.length);
        this.addWatchFile(filename);
        return 'export default ' + JSON.stringify(await readFile(filename, 'utf8')) + ';';
      }
      if (/\.svg$/.test(id) && !id.includes('/node_modules/')) {
        return 'export default ' + JSON.stringify(await readFile(id, 'utf8')) + ';';
      }
    },
    async transform(code, id) {
      const filename = id.split('?')[0];
      if (!/\.[jt]sx?$/.test(filename) || filename.includes('/node_modules/')) return;
      if (![modules, app].some(directory => filename.startsWith(normalizePath(directory) + '/'))) return;
      const result = await transformAsync(code, {
        filename,
        babelrc: false,
        configFile: false,
        sourceMaps: true,
        presets: [
          ...(/\.tsx?$/.test(filename) ? [['@babel/preset-typescript', {allExtensions: true, isTSX: filename.endsWith('.tsx')}]] : []),
          '@babel/preset-react'
        ],
        plugins: [['@babel/plugin-proposal-decorators', {legacy: true}], '@babel/plugin-proposal-class-properties']
      });
      return {
        code: result.code.replace(/\b__dirname\b/g, JSON.stringify(normalizePath(path.relative(root, path.dirname(filename))))),
        map: result.map
      };
    }
  };
}

function staticResources() {
  return {
    name: 'jsketcher-static-resources',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const asset = decodeURIComponent((request.url || '').split('?')[0]).replace(/^\/lib-assets\//, '');
        if (!request.url.startsWith('/lib-assets/') || !libAssets.includes(asset)) return next();
        const stream = createReadStream(path.join(root, 'node_modules', asset));
        if (asset.endsWith('.wasm')) response.setHeader('Content-Type', 'application/wasm');
        if (asset.endsWith('.css')) response.setHeader('Content-Type', 'text/css');
        if (asset.endsWith('.js')) response.setHeader('Content-Type', 'application/javascript');
        stream.on('error', next);
        stream.pipe(response);
      });
    },
    async closeBundle() {
      const dist = path.join(root, 'dist');
      for (const entry of await readdir(web, {withFileTypes: true})) {
        if (entry.isDirectory() && !['app', 'test'].includes(entry.name)) {
          await cp(path.join(web, entry.name), path.join(dist, entry.name), {recursive: true});
        }
      }
      for (const asset of libAssets) {
        const destination = path.join(dist, 'lib-assets', asset);
        await mkdir(path.dirname(destination), {recursive: true});
        await copyFile(path.join(root, 'node_modules', asset), destination);
      }
      const revision = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim();
      await writeFile(path.join(dist, '.rev'), revision + '\n');
      console.log(revision);
    }
  };
}

function documentation() {
  async function generate() {
    const files = await new Promise((resolve, reject) => {
      glob(docsPattern, {cwd: docsSource, nodir: true}, (error, matches) => error ? reject(error) : resolve(matches));
    });
    const docsRoot = path.join(web, 'docs');
    const template = Handlebars.compile(await readFile(path.join(modules, 'doc/doc-layout.handlebars'), 'utf8'));
    const workbenches = new Map();

    for (const file of files) {
      const parts = file.replace(/\\/g, '/').split('/');
      const workbenchName = parts[0];
      const operationName = parts[2];
      let workbench = workbenches.get(workbenchName);
      if (!workbench) {
        workbench = {workbenchName, operations: []};
        workbenches.set(workbenchName, workbench);
      }
      if (file.endsWith('.md')) {
        const link = path.posix.join('docs', file.replace(/\\/g, '/'));
        workbench.operations.push({operationName, href: '../../../../../../' + convertMdPathToHtml(link)});
      }

      const source = path.join(docsSource, file);
      const destination = path.join(docsRoot, file);
      await mkdir(path.dirname(destination), {recursive: true});
      await copyFile(source, destination);
    }

    const sidenav = Array.from(workbenches.values());
    for (const file of files.filter(file => file.endsWith('.md'))) {
      const content = await readFile(path.join(docsSource, file), 'utf8');
      const destination = path.join(docsRoot, convertMdPathToHtml(file));
      const html = template({sidenav, content: fixLinks(marked(content))});
      await mkdir(path.dirname(destination), {recursive: true});
      await writeFile(destination, html);
    }
  }

  return {
    name: 'jsketcher-documentation',
    buildStart: generate,
    configureServer(server) {
      server.watcher.add(path.join(docsSource, '**', 'docs', '**', '*.md'));
      server.watcher.on('all', async (event, file) => {
        if (file.endsWith('.md') && file.includes(`${path.sep}docs${path.sep}`)) {
          await generate();
          server.ws.send({type: 'full-reload'});
        }
      });
      return generate();
    }
  };
}

function convertMdPathToHtml(mdPath) {
  return mdPath.substring(0, mdPath.length - '.md'.length) + '.html';
}

function fixLinks(htmlContent) {
  return htmlContent.replace(/href=['"](.+)['"]/g, (expression, link) => {
    return 'href="' + convertMdPathToHtml(link) + '"';
  });
}

export default defineConfig({
  root: web,
  publicDir: false,
  plugins: [legacySources(), documentation(), staticResources()],
  resolve: {alias: aliases, extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']},
  css: {
    modules: {generateScopedName: (name, filename) => scopedName(name, filename.split('?')[0])}
  },
  server: {host: '0.0.0.0', port: 3000, fs: {allow: [root]}},
  preview: {host: '0.0.0.0', port: 3000},
  build: {
    outDir: path.join(root, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    commonjsOptions: {transformMixedEsModules: true, include: [/node_modules/]},
    rollupOptions: {input: {index: path.join(web, 'index.html'), sketcher: path.join(web, 'sketcher.html')}}
  },
  optimizeDeps: {
    include: ['babel-polyfill', 'react', 'react-dom'],
    exclude: ['verb-nurbs'],
    esbuildOptions: {loader: {'.js': 'jsx'}}
  }
});
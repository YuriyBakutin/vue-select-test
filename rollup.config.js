// import { rollup } from "rollup";
import commonJs from '@rollup/plugin-commonjs'
import url from '@rollup/plugin-url'
import image from '@rollup/plugin-image'
import resolve from '@rollup/plugin-node-resolve'
import typeScript from 'rollup-plugin-typescript2'
import bundleScss from 'rollup-plugin-bundle-scss';
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import scss from 'rollup-plugin-scss'
import clear from 'rollup-plugin-clear'
import path from "path"
// import entryPoints from "./frontendEntryPoints"

// const rootFolder = 'wwwroot';
// const jsOutputFolder = '' // path.join(rootFolder, 'build')
// // const jsOutputFolder = path.join(rootFolder, 'js', 'build', 'Scripts');
// const cssOutputFolder = path.join(rootFolder, 'css', 'build')

const commonPlugins = [
    image(),
    resolve({
        mainFields: ['module', 'main',],
        browser: true,
        preferBuiltins: true,
    }),
    commonJs({ namedExports: { axios: ['get'] } }),
    url({
        // by default, rollup-plugin-url will not handle font files
        include: ['**/*.woff', '**/*.woff2'],
        // setting infinite limit will ensure that the files
        // are always bundled with the code, not copied to /dist
        limit: Infinity,
    }),
    bundleScss(),
    vue(),
    scss({
        output: 'public/css/bundle.css'
    }),
    typeScript({
        tsconfig: "tsconfig.json"
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    clear({
        targets: ['public/js', 'public/css']
    }),
]

const prodPlugins = [
    terser(),
]

const preserveModules = false; //process.env.NODE_ENV != 'production', // true

function generatepathForEntryPoint(chunkInfo) {
    const rootPath = path.sep + 'Odin.Web' + path.sep;
    const fullPath = chunkInfo.facadeModuleId;
    const rootPosition = fullPath.indexOf(rootPath);
    const extPosition = fullPath.lastIndexOf('.');
    const relativePath = fullPath.substring(
        rootPosition + rootPath.length,
        extPosition);
    return relativePath + '.js';
}

const config = {
    // entry: 'src/main.js',
    // dest: 'public/js/main.js',
    input: 'src/main.ts',
    preserveEntrySignatures: 'strict',
    output: {
        file: 'public/js/main.js', //preserveModules ? jsOutputFolder : path.join(jsOutputFolder, 'Scripts'),
        format: 'esm',
        // entryFileNames: generatepathForEntryPoint, //'[name].js',
        // chunkFileNames: '[name]-[hash].js',
        preserveModules: preserveModules
    },
    plugins: process.env.NODE_ENV == 'development' ? commonPlugins : [...commonPlugins, ...prodPlugins]
}

export default config

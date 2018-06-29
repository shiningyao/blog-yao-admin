/**
 * Created by yaoshining on 2016/12/29.
 */
const autoprefixer = require('autoprefixer');
const postCssMixins = require('postcss-mixins');
const postCssImport = require('postcss-import');
const postCssSimpleVars = require('postcss-simple-vars');
const postCssNested = require('postcss-nested');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['last 5 versions']
        }),
        postCssImport(),
        postCssMixins(),
        postCssSimpleVars(),
        postCssNested(),
    ]
};
/**
 * Created by yaoshining on 2016/12/29.
 */
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['last 5 versions']
        })
    ]
};
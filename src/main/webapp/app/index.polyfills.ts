import 'core-js/es6/promise';

export const polyfillLoader = new Promise<void>((resolve, reject) => {
    if(!global.Intl) {
        require.ensure([
            'intl',
            'intl/locale-data/jsonp/en.js',
            'intl/locale-data/jsonp/zh.js'
        ], function(require) {
            require('intl');
            require('intl/locale-data/jsonp/en.js');
            require('intl/locale-data/jsonp/zh.js');
            resolve();
        }, function(error) {
            reject(error);
        }, 'intl');
    } else {
        resolve();
    }
});
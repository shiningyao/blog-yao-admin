import * as webpackMerge from 'webpack-merge';

const _configs = {

    global: require(__dirname + '/global'),

    production: require(__dirname + '/dev'),
    development: require(__dirname + '/prod')
};

const projectRoot = process.cwd();

function _load() {
    const ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : 'production';

    return _configs && webpackMerge(
            _configs.global(projectRoot),
            _configs[ENV](projectRoot)
        );
}

const webpackConfig = _load();

export default webpackConfig; 
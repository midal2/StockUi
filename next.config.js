// webpack config
module.exports = {
    webpack: (config, options) => {
        config.devServer= {
            host: '0.0.0.0',
            port: 8888 , 
            disableHostCheck : true,
            historyApiFallback: true,
            contentBase: './',
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
        };
        return config;
    }
}

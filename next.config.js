//nextjs내 javascript에서 환경변수사용을 위한 실행환경값 전달
const publicRuntimeConfig = {
    NODE_ENV: process.env.NODE_ENV,
}

// webpack config
module.exports = {
    publicRuntimeConfig,  //nextjs내 javascript에서 환경변수사용을 위한 실행환경값 전달
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

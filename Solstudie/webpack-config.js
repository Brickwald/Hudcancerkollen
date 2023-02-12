const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: "./app.tsx",
        admin: "./admin.tsx",
    },
    mode: "development",
    output: {
        filename: "./[name]-bundle.js"
    },
    plugins: [new EncodingPlugin({
        encoding: 'utf8'
    })],
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
}
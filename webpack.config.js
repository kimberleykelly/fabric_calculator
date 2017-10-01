const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: 'style.css'
})
module.exports = {
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js'
    },
	watch: true,
    module: {
        rules:[
            {
                test: /\.scss/,
                use: extractSass.extract({ 
                    use: [
                        {loader:"css-loader"},
                        {loader:"sass-loader"},
                    ]
                }),
            }, 
            {
                test: /\.js/,
                exclude: path.resolve(__dirname, './node_modules'),
                use: [
                    {loader:"babel-loader"}
                ]
            }
        ]    
    },
    plugins:[ 
        extractSass
    ]
}

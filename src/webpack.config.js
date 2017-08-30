var webpack=require("webpack");
var path=require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
    entry: __dirname+"/js/app/index.js",
    output:{
        path: path.join(__dirname,"../public"),
        filename: "index.js",
        publicPath: "../"
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            })
        },{
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=8192 &name=images/[hash:8].[name].[ext]'
        }]
    },
    resolve:{
        alias:{
            jquery: path.join(__dirname,"/js/lib/jquery.min.js"),
            less: path.join(__dirname,"less")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new ExtractTextPlugin("css/index.css")
    ]
};
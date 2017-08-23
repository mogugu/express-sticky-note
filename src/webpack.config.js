var webpack=require("webpack");
var path=require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
    entry: __dirname+"/js/app/index.js",
    output:{
        path: path.join(__dirname,"../public/js"),
        filename: "index.js"
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ["style-loader","css-loader", "less-loader"]
        },{
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=8192$name=img/[name]'
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
        })
    ]
};
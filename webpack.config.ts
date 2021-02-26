import webpack from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import type { Configuration } from 'webpack';

const modoDev = process.env.NODE_ENV !== 'production';

export const config: Configuration = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.ts',
    devServer: {
        contentBase: './build',
        port: 9000,
    },
    devtool: 'source-map',
    output: {
        filename: 'app.js',
        path: __dirname + '/build',
        publicPath: '',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        new CopyWebpackPlugin({
            patterns: [
                { context: 'src', from: '**/*.html' },
                { context: 'src', from: 'imgs/**/*' },
            ],
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts/,
                use: ['ts-loader'],
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', // Adiciona CSS a DOM injetando a tag <style>
                    'css-loader', // interpreta @import, url()...
                    'sass-loader',
                ],
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            }, {
                test: /.(ttf|otf|eot|svg|woff(2)?)$/,
                use: ['file-loader'],
            }
        ],
    }
};
export default config;

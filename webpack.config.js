const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "production",
  devtool: "source-map",
  target: "web",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,
          // Load the CSS, set url = false to prevent following urls to fonts and images.
          {
            loader: "css-loader",
            options: { modules: true, url: false, importLoaders: 1 },
          },
          // Add browser prefixes and minify CSS.
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer(), cssnano()],
              },
            },
          },
          // Load the SCSS/SASS
          { loader: "sass-loader" },
        ],
      },
    ],
  },

  plugins: [
    // Define the filename pattern for CSS.
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "[id].css",
    }),
  ],
};

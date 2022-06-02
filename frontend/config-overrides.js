/* config-overrides.js */
const {
  addBabelPlugins,
  addWebpackAlias,
  override,
  addWebpackModuleRule,
} = require("customize-cra");

const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@actions": path.join(__dirname, "src/redux/actions"),
    "@assets": path.join(__dirname, "src/assets"),
    "@components": path.join(__dirname, "src/components"),
    "@config": path.join(__dirname, "src/config"),
    "@constants": path.join(__dirname, "src/constants"),
    "@reducers": path.join(__dirname, "src/redux/reducers"),
    "@redux": path.join(__dirname, "src/redux"),
    "@helpers": path.join(__dirname, "src/helpers"),
    "@services": path.join(__dirname, "src/services"),
    "@styles": path.join(__dirname, "src/styles"),
    "@utils": path.join(__dirname, "src/utils"),
    "@views": path.join(__dirname, "src/views"),
  }),
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      {
        loader: "to-string-loader",
      },
      {
        loader: "css-loader",
        options: { esModule: false },
      },
      {
        loader: "sass-loader",
        options: {
          sassOptions: {
            includePaths: [path.resolve(__dirname, "node_modules")],
          },
        },
      },
    ],
  }),
  ...addBabelPlugins("@babel/plugin-proposal-optional-chaining")
);

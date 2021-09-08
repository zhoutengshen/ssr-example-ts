/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const resolve = (target) => path.resolve(__dirname, target);
const nodeExternals = require("webpack-node-externals");
const ClientPlugin = require("vue-server-renderer/client-plugin");
const ServerPlugin = require("vue-server-renderer/server-plugin");
const merge = require("lodash/merge");
// 构建ssr 需要的bundle
const isSsr = process.env.WEBPACK_TARGET === "node";
module.exports = {
  assetsDir: "assets",
  // outputDir: "dist",
  configureWebpack() {
    return {
      entry: isSsr
        ? resolve("./src/entry/server")
        : resolve("./src/entry/client"),
      target: isSsr ? "node" : undefined,
      devtool: "source-map",
      output: {
        libraryTarget: isSsr ? "commonjs2" : undefined,
      },
      externals: isSsr
        ? nodeExternals({
            allowlist: /\.css$/,
          })
        : undefined,
      plugins: [isSsr ? new ServerPlugin() : new ClientPlugin()],
    };
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        return merge(options, {
          optimizeSSR: false,
        });
      });

    // fix ssr hot update bug
    if (isSsr) {
      // config.plugins.delete("hmr");
    }
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};

const webpackConfig = require("@vue/cli-service/webpack.config.js");
import Webpack from "webpack";
import MemoryFs from "memory-fs";
import { join } from "path";
import axios from "axios";
// 单例
export default class BundleGen {
  private static instance: BundleGen;
  private serverBundle: any;
  private clientBundle: any;
  constructor() {
    if (BundleGen.instance) {
      console.log("复用旧的 BundleGen 实例");
      return BundleGen.instance;
    } else {
      console.log("初始化 BundleGen");
      BundleGen.instance = this;
      this.initWebpack();
    }
  }
  getServerBundle(): any {
    return this.serverBundle;
  }
  async getClientBundle(): Promise<any> {
    try {
      const resp = await axios.get(
        "http://localhost:8080/vue-ssr-client-manifest.json"
      );
      return (this.clientBundle = resp.data);
    } catch (e) {
      return undefined;
    }
  }
  private initWebpack(): void {
    console.log("初始化webpack");
    const mf = new MemoryFs();
    const webpack = Webpack(webpackConfig);
    webpack.outputFileSystem = mf;
    webpack.watch({}, (err, stats) => {
      const statsJson = stats.toJson();
      statsJson.errors.forEach((item) => {
        console.error(item);
      });
      statsJson.warnings.forEach((item) => {
        console.log(item);
      });
      const outputPath = join(
        webpackConfig.output.path,
        "vue-ssr-server-bundle.json"
      );

      this.serverBundle = JSON.parse(mf.readFileSync(outputPath, "utf-8"));
    });
  }
}

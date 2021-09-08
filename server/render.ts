import { Context } from "koa";
import { createBundleRenderer } from "vue-server-renderer";
import fs from "fs";
import path from "path";
import BundleGen from "./BundleGen";
const resolve = (target: string) => path.resolve(__dirname, target);

const templateHtml = fs.readFileSync(resolve("./template.html"), {
  encoding: "utf-8",
});
const bundleGen = new BundleGen();
export default (ctx: Context): Promise<string> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const clientManifest = await bundleGen.getClientBundle();
    createBundleRenderer(bundleGen.getServerBundle(), {
      clientManifest: clientManifest,
      template: templateHtml,
      runInNewContext: false,
    })
      .renderToString(ctx)
      .then(resolve)
      .catch(reject);
  });
};

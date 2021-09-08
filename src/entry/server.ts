import { createApp } from "@/app";
import { Context } from "koa";
import Vue from "vue";
export default (ctx: Context): Promise<Vue> => {
  return new Promise((resolve, reject) => {
    const { app: vm, router } = createApp();
    const url = ctx.url;
    router.push(url);
    router.onReady(
      () => {
        const matchedComponents = router.getMatchedComponents();
        if (!matchedComponents) {
          reject("not match router");
        } else {
          resolve(vm);
        }
      },
      (e) => {
        reject(e);
      }
    );
  });
};

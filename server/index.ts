import koa, { Context } from "koa";
import prox from "koa-proxy";
import { PORT } from "./config";
import render from "./render";

const app = new koa();
app.use(
  prox({
    match: /^\/assets\//,
    host: "http://localhost:8080",
  })
);
app.use(async (ctx: Context, next) => {
  const html = await render(ctx);
  ctx.body = html;
  next();
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

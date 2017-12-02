const Router = require("koa-router");
const oauth = require("./oauth");

module.exports = app => {
  const router = new Router();

  router.get("/", async ctx => {
    ctx.body = "hi";
  });

  oauth(router);

  // route not found.
  router.get(/.*/, async ctx => {
    ctx.throw(404, "Not found");
  });

  app.use(router.routes()).use(router.allowedMethods());
};

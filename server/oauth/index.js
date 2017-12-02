const Router = require("koa-router");

module.exports = app => {
  const router = new Router({
    prefix: "/oauth",
  });

  router.get("/", async ctx => {
    ctx.body = "oauth!";
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};

const Router = require("koa-router");
const authorise = require("./authorise");
const callback = require("./callback");

module.exports = app => {
  const router = new Router({
    prefix: "/connect/uclapi",
  });
  router.get("/", authorise);
  router.get("/callback", callback);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

Router = require("koa-router");
const callback = require("./callback");

module.exports = app => {
  const router = new Router({
    prefix: "/connect/uclapi",
  });
  router.get("/", require("./authorise"));
  router.get("/callback", require("./callback"));

  app.use(router.routes());
  app.use(router.allowedMethods());
};

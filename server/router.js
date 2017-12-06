const Router = require("koa-router");
const oauth = require("./oauth");

module.exports = app => {
  const router = new Router();

  router.get("/", async ctx => {
    ctx.query.pretty = true;
    ctx.body = {
      routes: {
        "/session": "Returns the currently authenticated user's session",
        "/connect/uclapi": "Authorise via the UCL API",
        "/connect/uclapi/callback": "Callback from the UCL API",
      },
      tips: {
        "pretty-print": "Add ?pretty=true to pretty print the json (as shown)",
      },
    };
  });

  router.get("/session", async ctx => {
    ctx.body = ctx.session;
  });

  oauth(router);

  // route not found.
  router.get(/.*/, async ctx => {
    ctx.throw(404, "Not found");
  });

  app.use(router.routes()).use(router.allowedMethods());
};

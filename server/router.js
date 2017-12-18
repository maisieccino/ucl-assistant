const Router = require("koa-router");
const oauth = require("./oauth");
const { jwt } = require("./middleware/auth");
const { getUserData } = require("./uclapi/user");

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

  oauth(router);

  router.get("/testauth", jwt, async ctx => {
    ctx.body = "Authenticated!";
  });

  router.get("/user", jwt, async ctx => {
    ctx.body = await getUserData(ctx.state.user.apiToken);
  });

  // route not found.
  router.get(/.*/, async ctx => {
    ctx.throw(404, "Not found");
  });

  app.use(router.routes()).use(router.allowedMethods());
};

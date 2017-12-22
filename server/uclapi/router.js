const Router = require("koa-router");
const { jwt } = require("../middleware/auth");
const { getUserData } = require("./user");
const { getPersonalTimetable } = require("./timetable");

module.exports = app => {
  const router = new Router();

  router.get("/user", jwt, async ctx => {
    ctx.body = await getUserData(ctx.state.user.apiToken);
  });

  router.get("/timetable", jwt, async ctx => {
    const date = ctx.query.date || null;
    ctx.body = await getPersonalTimetable(ctx.state.user.apiToken, date);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};

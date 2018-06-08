const Koa = require("koa");
const Router = require("koa-router");
const api = require("./api");
const { jwt } = require("../middleware/auth");

const app = new Koa();

app.use(async (ctx, next) => {
  if (!process.env.NOTIFICATION_API) {
    ctx.throw(500, "Notifications are not supported");
  }
  await next;
});

const router = new Router();

router.post("/register", jwt, async ctx => {
  const { token } = ctx.request.body;
  ctx.assert(token, 400, "No token provided.");
  try {
    await api.register(ctx.state.user.upi);
    await api.sendNotification(ctx.state.user.upi, {
      title: "Test Notification",
      content: "Congratulations! Notifications are successfully working.",
    });
  } catch (err) {
    ctx.throw(400, err.message);
  }
  ctx.body = "success";
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;

const Router = require("koa-router");
const passport = require("koa-passport");

module.exports = app => {
  const router = new Router({
    prefix: "/oauth",
  });

  router.get("/", passport.authenticate("oauth2"));
  router.get("/callback", ctx => {
    return passport.authenticate("oauth2", (err, user, info, status) => {
      if (user === false) {
        ctx.error = "No user found/unauthenticated";
        ctx.throw(401);
      } else {
        ctx.body = { ...user };
        return ctx.login(user).then(() => {
          ctx.redirect(`UCLAssistant://login?user=${JSON.stringify(user)}`);
        });
      }
    });
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};

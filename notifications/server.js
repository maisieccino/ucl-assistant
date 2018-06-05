const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Raven = require("raven");
const router = require("./router");

require("dotenv").config();

Raven.config().install();

const app = new Koa();

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

Raven.context(() => {
  app.listen(process.env.PORT || 3000);
});

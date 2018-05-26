const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Raven = require("raven");

require("dotenv").config();

Raven.config().install();

const app = new Koa();

app.use(bodyParser());
Raven.context(() => {
  app.listen(process.env.PORT || 3000);
});

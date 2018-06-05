const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const objection = require("objection");
const Knex = require("knex");
const Raven = require("raven");
const router = require("./router");
const knexConfig = require("./knexfile");

require("dotenv").config();

Raven.config().install();

const app = new Koa();

const knex = Knex(knexConfig);
objection.Model.knex(knex);

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

Raven.context(() => {
  app.listen(process.env.PORT || 3000);
});

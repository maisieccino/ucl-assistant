const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const { jsonify, logger, timer } = require("./middleware");
const router = require("./router");

require("dotenv").config();

const app = new Koa();

app.use(bodyparser());
app.use(timer);
app.use(logger);
app.use(jsonify);
router(app);

app.listen(process.env.PORT || 3000);

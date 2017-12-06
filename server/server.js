const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const session = require("koa-session");
const { jsonify, logger, timer } = require("./middleware");
const router = require("./router");

require("dotenv").config();
const app = new Koa();

app.keys = [process.env.SECRET || "secret"];
app.use(session({}, app));

app.use(bodyparser());
app.use(timer);
app.use(logger);
app.use(jsonify);
router(app);

app.listen(process.env.PORT || 3000);

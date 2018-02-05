const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const session = require("koa-session");
const { jsonify, logger, timer } = require("./middleware");
const router = require("./router");

require("dotenv").config();

const app = new Koa();

if (!process.env.UCLAPI_CLIENT_ID || !process.env.UCLAPI_CLIENT_SECRET) {
  console.error(
    "Error! You have not set the UCLAPI_CLIENT_ID or UCLAPI_CLIENT_SECRET environment variables.",
  );
  console.log("Please set them to run this app.");
  process.abort();
}

if (!process.env.SECRET) {
  console.warn(
    "Warning: You have not set the SECRET environment variable. This is not secure and definitely not recommended.",
  );
}

app.keys = [process.env.SECRET || "secret"];

app.use(session({}, app));

app.use(bodyparser());
app.use(timer);
app.use(logger);
app.use(jsonify);
router(app);

app.listen(process.env.PORT || 3000);

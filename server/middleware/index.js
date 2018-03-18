const auth = require("./auth");

/**
 * Middleware that records the response time of the request
 * @param  {Koa.ctx}   ctx Koa context
 * @param  {Function} next async function to call next
 */
const timer = async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set("x-response-time", `${ms}ms`);
};

/**
 * Middleware that logs the request path and response code
 * @param  {Koa.ctx}   ctx Koa context
 * @param  {Function} next async function to call next
 */
const logger = async (ctx, next) => {
  await next();
  console.log(`${ctx.method} ${ctx.url} => ${ctx.status} "${ctx.message}"`);
};

const jsonFormatPretty = ctx =>
  JSON.stringify(
    {
      content: ctx.body,
      error: ctx.error || "",
    },
    "\n",
    3,
  );

const jsonFormat = ctx =>
  JSON.stringify({
    content: ctx.body,
    error: ctx.error || "",
  });

const stripSecrets = s =>
  s
    .replace(process.env.SECRET, "")
    .replace(process.env.UCLAPI_TOKEN, "")
    .replace(process.env.SENTRY_DSN, "")
    .replace(process.env.REDIS_URL, "")
    .replace(process.env.UCLAPI_CLIENT_SECRET, "");

/**
 * Middleware that encapsulates reponse body in a JSON object
 * @param  {Koa.ctx}   ctx Koa context
 * @param  {Function} next async function to call next
 */
const jsonify = async (ctx, next) => {
  ctx.state.jsonify = true;
  try {
    await next();
  } catch (error) {
    if (typeof error.message === "string") {
      const errorMessage = stripSecrets(error.message);
      console.error(`Error: ${errorMessage}\n${error.stack}`);
      ctx.error = errorMessage;
    } else {
      const errorMessage = stripSecrets(JSON.stringify(error.message, "\n", 2));
      console.error(`Error: ${errorMessage}\n${error.stack}`);
      ctx.error = errorMessage;
    }
    ctx.status = error.status || 500;
  }

  if (ctx.state.jsonify) {
    // pretty-print if the pretty query variable is present
    ctx.body = ctx.query.pretty ? jsonFormatPretty(ctx) : jsonFormat(ctx);
  }
};

module.exports = {
  jsonify,
  logger,
  timer,
  auth,
};

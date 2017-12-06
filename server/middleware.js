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

/**
 * Middleware that encapsulates reponse body in a JSON object
 * @param  {Koa.ctx}   ctx Koa context
 * @param  {Function} next async function to call next
 */
const jsonify = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    ctx.error = error.message;
    ctx.status = error.status || 500;
  }
  // pretty-print if the pretty query variable is present
  ctx.body = ctx.query.pretty ? jsonFormatPretty(ctx) : jsonFormat(ctx);
};

module.exports = {
  jsonify,
  logger,
  timer,
};

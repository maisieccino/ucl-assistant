const Router = require("koa-router");

const router = new Router();

const { ValidationError } = require("objection");
const Expo = require("expo-server-sdk");
const Mapping = require("./Mapping");

const expo = new Expo();

router.post("/register", async ctx => {
  const { upi, pushToken } = ctx.request.body;
  ctx.assert(upi, 400, "UPI is required.");
  ctx.assert(pushToken, 400, "An Exponent push token is required.");
  const mapping = await Mapping.query().findById(upi);
  try {
    if (mapping) {
      await Mapping.query().updateAndFetchById(upi, { token: pushToken });
    } else {
      await Mapping.query().insert({ upi, token: pushToken });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.throw(
        `Validation error. Make sure the UPI and Exponent push token are formatted properly.\n${JSON.stringify(
          error.data,
        )}`,
        400,
      );
    } else {
      throw error;
    }
  }
  ctx.body = "success";
});

router.post("/upi/:upi", async ctx => {
  ctx.assert(ctx.params.upi, 400, "UPI is required");
  const { upi } = ctx.params;
  const {
    title = "UCL Assistant",
    content,
    type = "default",
    path = "/",
  } = ctx.request.body;
  ctx.assert(content, 400, "Notification must have content");
  const mapping = await Mapping.query().findById(upi);
  if (!mapping) {
    ctx.throw("Mapping with that UPI not found", 404);
  }

  try {
    await expo.sendPushNotificationAsync({
      to: mapping.token,
      sound: "default",
      title,
      body: content,
      data: {
        type,
        path,
      },
    });
    ctx.body = "success";
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error, 500);
  }
});

module.exports = router;

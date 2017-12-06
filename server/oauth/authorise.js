const moment = require("moment");

module.exports = async ctx => {
  console.log("redirecting...");
  ctx.session = {
    state: moment().valueOf(),
  };
  const url = `https://uclapi.com/oauth/authorise?client_id=${
    process.env.UCLAPI_CLIENT_ID
  }&state=${ctx.session.state}`;
  ctx.redirect(url);
};

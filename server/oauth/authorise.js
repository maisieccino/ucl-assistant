const moment = require("moment");

module.exports = async ctx => {
  ctx.session = {
    state: moment().valueOf(),
    redirectURL: ctx.query.return || "UCLAssistant://+auth",
  };
  const url = `https://uclapi.com/oauth/authorise?client_id=${
    process.env.UCLAPI_CLIENT_ID
  }&state=${ctx.session.state}`;
  ctx.redirect(url);
};

const moment = require("moment");
const { API_URL } = require("../uclapi/constants.js");

module.exports = async ctx => {
  ctx.session = {
    state: moment().valueOf(),
    redirectURL: decodeURIComponent(ctx.query.return) || "UCLAssistant://+auth",
  };
  const url = `${API_URL}/oauth/authorise?client_id=${
    process.env.UCLAPI_CLIENT_ID
  }&state=${ctx.session.state}`;
  ctx.redirect(url);
};

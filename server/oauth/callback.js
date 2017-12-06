const fetch = require("node-fetch");
// module.exports.redirect = async ctx => {
//   await ctx.login();
//   console.log("helloooo");
//   ctx.redirect(`UCLAssistant://login?user=${JSON.stringify(ctx.user)}`);
// }

module.exports = async ctx => {
  if (!Object.keys(ctx.session).includes("state")) {
    ctx.throw("You need to authorise first", 401);
  }
  const { result, code, state } = ctx.query;

  // make sure states match.
  if (`${state}` !== `${ctx.session.state}`) {
    ctx.throw("States don't match", 500);
  }

  // if user says "no"
  if (result === "denied") {
    ctx.throw("Request denied", 400);
  }

  try {
    // trade auth code for a token
    const tokenURL = `https://uclapi.com/oauth/token?client_id=${
      process.env.UCLAPI_CLIENT_ID
    }&client_secret=${process.env.UCLAPI_CLIENT_SECRET}&code=${code}`;
    let res = await fetch(tokenURL, {
      headers: {
        accept: "application/json",
      },
    });
    let json = {};
    try {
      json = await res.json();
    } catch (error) {
      // set a json value if it can't be parsed
      json = { body: await res.text() };
    }
    // fail gracefully if there was a problem.
    if (!res.ok || !json.ok) {
      throw new Error(json);
    }

    // update session to include token.
    ctx.session.token = json.token;

    // fetch user data.
    const userDataURL = `https://uclapi.com/oauth/user/data?client_secret=${
      process.env.UCLAPI_CLIENT_SECRET
    }&token=${ctx.session.token}`;
    res = await fetch(userDataURL, {
      headers: { accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    // add this to the session
    ctx.session = {
      ...(await res.json()),
      ...ctx.session,
    };
    ctx.body = ctx.session;
  } catch (error) {
    ctx.throw(error.message, 500);
  }
};

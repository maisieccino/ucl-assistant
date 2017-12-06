const passport = require("koa-passport");
const { Strategy } = require("passport-oauth2");
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
const moment = require("moment");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const getUser = async (accessToken, refreshToken, clientId) => {
  const params = new URLSearchParams([
    ["token", token],
    ["client_id", clientId],
  ]);
  const res = await fetch(
    `https://uclapi.com/oauth/user/data?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = res.json();
  return {
    ...data,
    token,
    refreshToken,
  };
};

passport.use(
  new Strategy(
    {
      authorizationURL: "https://uclapi.com/oauth/authorise",
      tokenURL: "https://uclapi.com/oauth/token",
      clientID: process.env.UCLAPI_CLIENT_ID,
      clientSecret: process.env.UCLAPI_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/oauth/callback",
      state: true,
    },
    (accessToken, refreshToken, profile, done) => {
      getUser(accessToken, refreshToken, process.env.UCLAPI_CLIENT_ID).then(
        user => done(null, user),
      );
    },
  ),
);

const passport = require("koa-passport");
const { Strategy } = require("passport-oauth2");

passport.use(
  new Strategy({
    authorizationURL: "https://uclapi.com/oauth/authorise",
    tokenURL: "https://uclapi.com/oauth/token",
    clientID: process.env.UCLAPI_CLIENT_ID,
    clientSecret: process.env.UCLAPI_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth/callback",
  }),
);

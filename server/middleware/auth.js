const koaJwt = require("koa-jwt");
const jwt = require("jsonwebtoken");

const authenticate = async (ctx, next) => {
  if (ctx.session.isNew) {
    ctx.throw("You need to be authenticated to access this endpoint", 401);
  } else {
    await next();
  }
};

const jwtVerify = koaJwt({
  secret: process.env.SECRET,
});

const genToken = user => jwt.sign(user, process.env.SECRET);

module.exports = { authenticate, jwt: jwtVerify, genToken };

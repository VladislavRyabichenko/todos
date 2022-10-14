const jwt = require("jsonwebtoken");

const tokenValidation = async (ctx, next) => {
  await jwt.verify(
    ctx.request.headers["x-access-token"],
    process.env.SECRET_KEY,
    async function (error, decoded) {
      if (error) {
        ctx.request.json({
          status: "error",
          message: error.message,
          data: null,
        });
      } else {
        ctx.request.body.userId = decoded.id;
        await next();
      }
    }
  );
};

module.exports = {
  tokenValidation,
};

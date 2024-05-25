const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const cookies = req.cookies;

  console.log(req.originalUrl);

  if (!cookies || !cookies.token)
    return next(createHttpError.Unauthorized("You are unauthorized"));

  try {
    const payload = jwt.verify(cookies.token, process.env.JWT_SECRET);

    if (payload.role == "seller") {
      req.user = payload;

      if (req.originalUrl == "/seller-auth")
        return res.status(200).json({ message: "Authorized" });

      return next();
    } else return next(createHttpError.Unauthorized("You are unauthorized"));
  } catch (error) {
    return next(createHttpError.Unauthorized("You are unauthorized"));
  }
};

const createHttpError = require("http-errors");
const User = require("../Model/User");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
  Register: async (req, res, next) => {
    const { email, phone, firstname, lastname, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email }, { phone }],
        },
      });

      if (user != null) {
        if (user.email == email)
          return next(createHttpError.Conflict("Email address already in use"));

        return next(createHttpError.Conflict("Phone number already in use"));
      }

      // hash
      const key = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, key);

      const newUser = {
        email,
        phone,
        firstname,
        lastname,
        role: "buyer",
        password: hashedPassword,
        password_hash_key: key,
      };

      await User.create(newUser);

      return res.status(200).json({
        message: "Registered",
      });
    } catch (error) {
      console.log(error);

      return next(createHttpError.InternalServerError("Not registered"));
    }
  },

  Login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user == null) return next(createHttpError.NotFound("User not found"));

      if (!bcrypt.compareSync(password, user.password))
        return next(createHttpError.Unauthorized("Wrong credentials"));

      // generate token
      const token = jwt.sign(
        {
          id: user.id,
          email,
          role: user.role,
        },
        process.env.JWT_SECRET
      );

      res.cookie("token", token, {
        httpOnly: true,
      });

      return res.status(200).json({
        message: "Logged in",
      });
    } catch (error) {
      console.log(error);
      return next(createHttpError.InternalServerError("Cannot login"));
    }
  },
};

module.exports = controller;

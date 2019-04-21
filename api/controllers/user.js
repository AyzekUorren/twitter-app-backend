const { BadRequest, MongoError } = require("../config/error");
const { logOut } = require("../../logger/logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { secret, name } = require("../config/env");
const UserValidateSchema = require("../validations/user");
const Joi = require("joi");

const createToken = user =>
  jwt.sign(
    {
      iss: name,
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    secret
  );

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const { email, password, username } = req.body;

      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        throw new BadRequest("User already exist");
      }

      const newUser = new User({ email, password, username });
      return await newUser.save((err, user) => {
        if (err) {
          return new MongoError("Schema save failed");
        }
        const access_token = createToken(user);
        logOut(access_token);
        res.cookie("authorization", access_token);
        res.json({ access_token });
      });
    } catch (error) {
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    const access_token = createToken(req.user);
    logOut(access_token);
    res.cookie("authorization", access_token);
    res.json({ access_token });
  },

  logout: async (req, res, next) => {
    const { redirectUrl } = req.query;
    res.clearCookie("authorization");
    res.redirect(redirectUrl || "/");
  },

  getUser: async (req, res, next) => {
    const { _id, email, username } = req.user;
    const user = { id: _id, email, username };
    logOut(user);
    res.status(200).json(user);
  },

  emailToLowerCase: async (req, res, next) => {
    req.body.email = await req.body.email.toLowerCase();
    next();
  },

  validate: async (req, res, next) => {
    const { error } = Joi.validate(req.body, UserValidateSchema);
    if (error) {
      throw new BadRequest("User Schema is not Valid");
    }
    next();
  }
};

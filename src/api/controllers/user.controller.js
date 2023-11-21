const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User({
      ...req.body,
      profileImg: req.file
        ? req.file.path
        : "https://www.cariri.com/wp-content/uploads/2021/08/person-placeholder.png",
    })
    // const newUser = new User(req.body);
    // const userExist = await User.findOne({ username: newUser.username });
    // if (userExist) return next(new Error("User already exists"));
    await newUser.save();
    newUser.password = null;
    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(new Error("User not valid"));
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.username);
      return res.status(200).json({
        username: user.username,
        token: token,
      });
    } else {
      return next(new Error("Password not valid"));
    }
  } catch (error) {
    return next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const token = null;
    return res.status(201).json(token);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getUsers, registerUser, loginUser, logoutUser };
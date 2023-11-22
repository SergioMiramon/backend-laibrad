const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(new Error("Users not found"));
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { username } = req.params
    const user = await User.findById(username);
    if ( !user ) {
      const newUser = new User({
        ...req.body,
        profileImg: req.file
          ? req.file.path
          : "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700640365/p2xaugegcfc0tvpzihnu.png",
      })
      await newUser.save();
      newUser.password = null;
    }
    return res.status(201).json(newUser);
  } catch (error) {
    return next(new Error("Failing register"));
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
        profileImg: user.profileImg,
        token: token,
      });
    } else {
      return next(new Error(""));
    }
  } catch (error) {
    return next(new Error("Failing log in"));
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const token = null;
    return res.status(201).json(token);
  } catch (error) {
    return next(new Error("Failing log out"));
  }
};

module.exports = { getUsers, registerUser, loginUser, logoutUser };

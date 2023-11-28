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

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = new User(req.body);
    newUser._id = id
    await User.findByIdAndUpdate(id, {
      ...req.body,
      profileImg: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700737817/gwabploasgxbdsidi3dr.webp",
    }, {new: true});
    return res.status(200).json(newUser);
  } catch (error) {
    return next(new Error("Error updating user"));
  }
};

const registerUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return next(new Error("User already exist"));
    }
    if (!user) {
      const newUser = new User({
        ...req.body,
        profileImg: req.file
          ? req.file.path
          : "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700737817/gwabploasgxbdsidi3dr.webp",
      });
      await newUser.save();
      newUser.password = null;
      return res.status(201).json(newUser);
    }
  } catch (error) {
    return next(new Error("Failing registering"));
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
        id: user._id,
        username: user.username,
        profileImg: user.profileImg,
        token: token,
      });
    } else {
      return next(new Error("Password incorrect"));
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

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = await User.findByIdAndDelete(id);
    if (newUser.cover) deleteImgCloudinary(newUser.cover)
    return res.status(200).json(newUser);
  } catch (error) {
    return next(new Error("Failed deleting user"));
  }
};

module.exports = { getUsers, updateUser, registerUser, loginUser, logoutUser, deleteUser };

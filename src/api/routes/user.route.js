const express = require("express");

const {
    getUsers, registerUser, loginUser, logoutUser,
} = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth.middleware");
const { upload } = require("../../middlewares/file.middleware");

const UserRouter = express.Router();

UserRouter.get("/userslogged", [isAdmin], getUsers)
UserRouter.post("/register", upload.single("profileImg") ,registerUser)
UserRouter.post("/login", loginUser)
UserRouter.post("/logout", [isAuth], logoutUser)

module.exports = UserRouter;
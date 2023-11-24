const express = require("express");

const {
    getUsers, updateUser, registerUser, loginUser, logoutUser,
} = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth.middleware");
const { upload } = require("../../middlewares/file.middleware");

const UserRouter = express.Router();

UserRouter.get("/userslogged", [isAdmin], getUsers)
UserRouter.patch("/updateuser/:id", [isAuth], upload.single("profileImg"), updateUser)
UserRouter.post("/register", upload.single("profileImg") ,registerUser)
UserRouter.post("/login", loginUser)
UserRouter.post("/logout", [isAuth], logoutUser)

module.exports = UserRouter;
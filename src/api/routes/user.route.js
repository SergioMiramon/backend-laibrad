const express = require("express");

const {
    getUsers, updateUser, registerUser, loginUser, logoutUser, deleteUser,
} = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth.middleware");
const { upload } = require("../../middlewares/file.middleware");

const UserRouter = express.Router();

UserRouter.get("/userslogged", getUsers)
UserRouter.patch("/updateuser/:id", [isAuth], upload.single("profileImg"), updateUser)
UserRouter.post("/register", upload.single("profileImg") ,registerUser)
UserRouter.post("/login", loginUser)
UserRouter.post("/logout", [isAuth], logoutUser)
UserRouter.delete("/:id", [isAuth], deleteUser);

module.exports = UserRouter;
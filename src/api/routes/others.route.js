const express = require("express")

const {
    getOthers,
    getOtherByID,
    getOtherByTitle,
    getOthersByType,
    getTopRatedOthers,
    getOthersByYear,
    getOthersByPlatform,
    createOther,
    deleteOther,
    updateOther,
} = require("../controllers/others.controller")
const isAuth = require("../../middlewares/auth.middleware")
const { upload } = require("../../middlewares/file.middleware");
const coverUpload = upload.fields([
  {
    name: "cover_x",
  },
  {
    name: "cover_y",
  },
  {
    name: "cover_background",
  },
]);

const OtherRouter = express.Router();

OtherRouter.get("/", getOthers);
OtherRouter.get("/byid/:id", getOtherByID);
OtherRouter.get("/bytitle/:title", getOtherByTitle);
OtherRouter.get("/bytype/:type", getOthersByType);
OtherRouter.get("/toprated", getTopRatedOthers);
OtherRouter.get("/byyear/:year", getOthersByYear);
OtherRouter.get("/byplatform/:platform", getOthersByPlatform);
OtherRouter.post("/", [isAuth], coverUpload, createOther);
OtherRouter.put("/:id", [isAuth], coverUpload, updateOther);
OtherRouter.delete("/:id", [isAuth], deleteOther);

module.exports = OtherRouter;
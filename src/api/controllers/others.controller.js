const Other = require("../models/others.model");
const { deleteImgCloudinary } = require("../../middlewares/file.middleware");

const getOthers = async (req, res, next) => {
  try {
    const others = await Other.find();
    return res.status(200).json(others);
  } catch (error) {
    return next(new Error("Others not found"));
  }
};

const getOtherByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const other = await Other.findById(id);
    return res.status(200).json(other);
  } catch (error) {
    return next(new Error("Other by this ID not found"));
  }
};

const getOtherByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const other = await Other.find({ title: title });
    return res.status(200).json(other);
  } catch (error) {
    return next(new Error("Other by this title not found"));
  }
};

const getOthersByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const other = await Other.find({ type: type });
    return res.status(200).json(other);
  } catch (error) {
    return next(new Error("Others by this type not found"));
  }
};

const getTopRatedOthers = async (req, res, next) => {
    try {
        const other = await Other.find({ myrating: { $eq: "⭐⭐⭐⭐⭐"  } });
        return res.status(200).json(other);
      } catch (error) {
        return next(new Error("Top rated others not found"));
      }
};

const getOthersByYear = async (req, res, next) => {
  try {
    const { year } = req.params;
    const other = await Other.find({ year: year });
    return res.status(200).json(other);
  } catch (error) {
    return next(new Error("Others by this year not found"));
  }
};

const getOthersByPlatform = async (req, res, next) => {
  try {
    const { platform } = req.params;
    const other = await Other.find({ platform: platform });
    return res.status(200).json(other);
  } catch (error) {
    return next(new Error("Others by this platform not found"));
  }
};

const createOther = async (req, res, next) => {
  try {
    const newOther = new Other(req.body);
    if (req.files) {
      if (req.files.cover_x) {
        newOther.cover_x = req.files.cover_x[0].path;
      }
      if (req.files.cover_y) {
        newOther.cover_y = req.files.cover_y[0].path;
      }
      if (req.files.cover_background) {
        newOther.cover_background = req.files.cover_background[0].path;
      }
    }
    await newOther.save();
    return res.status(201).json(newOther);
  } catch (error) {
    return next(new Error("Failed creating other"));
  }
};

const deleteOther = async (req, res, next) => {
  try {
    const { id } = req.params;
    const other = await Other.findByIdAndDelete(id);
    if (other.cover_x) {
      deleteImgCloudinary(other.cover_x);
    }
    if (other.cover_y) {
      deleteImgCloudinary(other.cover_y);
    }
    if (other.cover_background) {
      deleteImgCloudinary(other.cover_background);
    }
    return res.status(200).json("Other deleted");
  } catch (error) {
    return next(new Error("Failed deleting other"));
  }
};

const updateOther = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateOther = await Other.findByIdAndUpdate(id, req.body);
    if (req.files) {
      if (req.files.cover_x) {
        newOther.cover_x = req.files.cover_x[0].path;
      }
      if (req.files.cover_y) {
        newOther.cover_y = req.files.cover_y[0].path;
      }
      if (req.files.cover_background) {
        newOther.cover_background = req.files.cover_background[0].path;
      }
    }
    return res.status(200).json(updateOther);
  } catch (error) {
    return next(new Error("Failed updating other"));
  }
};

module.exports = {
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
}
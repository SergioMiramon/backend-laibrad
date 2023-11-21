const Soundtrack = require("../models/soundtracks.model");

const getSoundtracks = async (req, res, next) => {
  try {
    const soundtracks = await Soundtrack.find();
    return res.status(200).json(soundtracks);
  } catch (error) {
    return next(new Error("Soundtracks not found"));
  }
};

const getSoundtrackByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const soundtrack = await Soundtrack.findById(id);
    return res.status(200).json(soundtrack);
  } catch (error) {
    return next(new Error("Soundtrack by this ID not found"));
  }
};

const getSoundtrackByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const soundtrack = await Soundtrack.find({ title: title });
    return res.status(200).json(soundtrack);
  } catch (error) {
    return next(new Error("Soundtrack by this title not found"));
  }
};

const getOfficialSoundtracks = async (req, res, next) => {
    try {
      const soundtrack = await Soundtrack.find({ official: { $eq: true } });
      return res.status(200).json(soundtrack);
    } catch (error) {
      return next(new Error("Official soundtracks not found"));
    }
  };

const getUnofficialSoundtracks = async (req, res, next) => {
    try {
      const soundtrack = await Soundtrack.find({ official: { $eq: false } });
      return res.status(200).json(soundtrack);
    } catch (error) {
      return next(new Error("Unofficial soundtracks not found"));
    }
  };

const getSoundtracksByArtist = async (req, res, next) => {
  try {
    const { artist } = req.params;
    const soundtrack = await Soundtrack.find({ artist: artist });
    return res.status(200).json(soundtrack);
  } catch (error) {
    return next(new Error("Soundtracks by this type not found"));
  }
};

const createSoundtrack = async (req, res, next) => {
  try {
    const soundtrack = new Soundtrack({
      ...req.body,
      cover: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png",
    })
    const newSoundtrack = await soundtrack.save();
    return res.status(201).json(newSoundtrack);
  } catch (error) {
    return next(new Error("Failed creating soundtrack"));
  }
};

const deleteSoundtrack = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newSoundtrack = await Soundtrack.findByIdAndDelete(id);
    if (newSoundtrack.cover) deleteImgCloudinary(newSoundtrack.cover)
    return res.status(200).json(newSoundtrack);
  } catch (error) {
    return next(new Error("Failed deleting soundtrack"));
  }
};

const updateSoundtrack = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newSoundtrack = await Soundtrack.findByIdAndUpdate(id, {
      ...req.body,
      cover: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dfhq3kjfl/image/upload/v1700076532/cyjdtsz4lc1yizgkozlp.png",
    }, {new: true});
    return res.status(200).json(newSoundtrack);
  } catch (error) {
    return next(new Error("Error updating soundtrack"));
  }
};

module.exports = {
    getSoundtracks,
    getSoundtrackByID,
    getSoundtrackByTitle,
    getOfficialSoundtracks,
    getUnofficialSoundtracks,
    getSoundtracksByArtist,
    createSoundtrack,
    deleteSoundtrack,
    updateSoundtrack,
}

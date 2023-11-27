const Soundtrack = require("../models/soundtracks.model");

const getSoundtracks = async (req, res, next) => {
  try {
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numSoundtracks = await Soundtrack.countDocuments();
      let page = parseInt(req.query.page);
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let numPages =
        numSoundtracks % limit > 0 ? numSoundtracks / limit + 1 : numSoundtracks / limit;
      console.log(numPages);
      if (page > numPages || page < 1) {
        page = 1;
      }
      const skip = (page - 1) * limit;

      const allSoundtracks = await Soundtrack.find().skip(skip).limit(limit);
      return res.status(200).json({
        info: {
          totalSoundtracks: numSoundtracks,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/soundtracks?page=${page + 1}&limit=${limit}`
              : null,
          prev: page != 1 ? `/soundtracks?page=${page - 1}&limit=${limit}` : null,
        },
        data: allSoundtracks,
      });
    } else {
      const allSoundtracks = await Soundtrack.find().limit(10);
      const numSoundtracks = await Soundtrack.countDocuments();

      return res.status(200).json({
        info: {
          totalSoundtracks: numSoundtracks,
          page: 1,
          limit: 10,
          next: numSoundtracks > 10 ? `/soundtracks?page=2&limit=10` : null,
          prev: null,
        },
        data: allSoundtracks,
      });
    }
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
    const soundtrack = await Soundtrack.findOne({ title: title });
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

const express = require("express")

const {
    getSoundtracks,
    getSoundtrackByID,
    getSoundtrackByTitle,
    getOfficialSoundtracks,
    getUnofficialSoundtracks,
    getSoundtracksByArtist,
    createSoundtrack,
    deleteSoundtrack,
    updateSoundtrack,
} = require("../controllers/soundtracks.controller")
const { isAuth } = require("../../middlewares/auth.middleware")
const { upload } = require("../../middlewares/file.middleware")
const SoundtrackRouter = express.Router();

SoundtrackRouter.get("/", getSoundtracks);
SoundtrackRouter.get("/byid/:id", getSoundtrackByID);
SoundtrackRouter.get("/bytitle/:title", getSoundtrackByTitle);
SoundtrackRouter.get("/official", getOfficialSoundtracks);
SoundtrackRouter.get("/unofficial", getUnofficialSoundtracks);
SoundtrackRouter.get("/byartist/:artist", getSoundtracksByArtist);
SoundtrackRouter.post("/", [isAuth], upload.single("cover"), createSoundtrack);
SoundtrackRouter.patch("/:id", [isAuth], upload.single("cover"), updateSoundtrack);
SoundtrackRouter.delete("/:id", [isAuth], deleteSoundtrack);

module.exports = SoundtrackRouter;
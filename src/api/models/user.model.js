const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator  = require('validator')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "Username 4 characters minimum"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Password 8 characters minimum"],
    },
    role: { type: String, enum: ["user", "admin"], required: false, trim: true, default: "user" },
    profileImg: { type: String, require: false, trim: true },
    // email: {
    //   type: String,
    //   trim: true,
    //   required: true,
    //   validate: [validator.isEmail, 'Email is not valid'],
    //   unique: true,
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})
const User = mongoose.model('users', userSchema)

module.exports = User
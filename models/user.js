const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    required: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  googleID: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  avatar: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  iat: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  branch: {
    type: String,
  },
  other_college: {
    type: String,
  },
  college: {
    type: String,
  },

  referal: {
    type: String,
  },
  detailsLeft: {
    type: Boolean,
    default: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  workshops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);

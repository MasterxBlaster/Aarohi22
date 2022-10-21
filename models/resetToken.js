const mongoose = require("mongoose");

const resetToken = new mongoose.Schema({
  tokenKey: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  craeted_at: {
    type: Date,
    default: Date.now(),
  },
  expire_at: {
    type: Date,
    default: Date.now() + 10800000,
  },
});
module.exports = mongoose.model("resetToken", resetToken);

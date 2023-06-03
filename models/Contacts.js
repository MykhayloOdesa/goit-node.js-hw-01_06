const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Set name for contact"],
    },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contacts = mongoose.model("Contact", schema);

module.exports = { Contacts };

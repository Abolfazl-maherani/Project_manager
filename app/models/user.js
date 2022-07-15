const { Schema, model } = require("mongoose");
const schemaUser = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobiles: { type: String, require: true, unique: true },
    roles: { type: String, default: ["USER"] },
    email: { type: String, require: true, unique: true },
    skills: { type: String, default: [] },
    team: { type: String, default: [] },
  },
  {
    timestamps: true,
  }
);
model.exports.userModel = model("user", schemaUser);

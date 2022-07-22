const { Schema, model, Types } = require("mongoose");
const schemaUser = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, require: true, unique: true },
    roles: { type: [String], default: ["USER"] },
    email: { type: String, require: true, unique: true },
    skills: { type: [String], default: [] },
    team: { type: [Types.ObjectId], default: [] },
    profile_image: { type: String },
  },
  {
    timestamps: true,
  }
);
const userModel = model("user", schemaUser);
module.exports.userModel = userModel;

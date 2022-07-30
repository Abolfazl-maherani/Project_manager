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
    profile_image: { type: String, default: "/default/default-user-image.png" },
  },
  {
    timestamps: true,
  }
);
const schemaInvitUser = new Schema(
  {
    asigner: {
      type: Types.ObjectId,
      required: true,
    },
    teamId: {
      type: Types.ObjectId,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);
// FIX: We dont create a new collection for invite user must save that to user collection
const userModel = model("user", schemaUser);
const inviteModel = model("invit", schemaInvitUser);
module.exports = {
  userModel,
  inviteModel,
};

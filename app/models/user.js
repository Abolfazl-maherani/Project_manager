const { Schema, model, Types } = require("mongoose");
const schemaInvitUser = new Schema({
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
  dataCreated: {
    type: Date,
    default: new Date(),
  },
});
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
    invites: {
      type: [schemaInvitUser],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", schemaUser);

// const inviteModel = model("invit", schemaInvitUser);
module.exports = {
  userModel,
};

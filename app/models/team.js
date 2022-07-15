const { Schema, model, Types } = require("mongoose");
const schemaTeam = new Schema(
  {
    name: { type: String, required: true },
    desciption: { type: String },
    users: { type: [Types.ObjectId], default: [] },
    owner: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);
model.exports.teamModel = model("team", schemaUser);

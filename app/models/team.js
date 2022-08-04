const { Schema, model, Types } = require("mongoose");
const schemaTeam = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    users: { type: [Types.ObjectId], default: [] },
    owner: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports.teamModel = model("team", schemaTeam);

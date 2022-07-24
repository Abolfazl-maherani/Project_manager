const { Schema, model, Types } = require("mongoose");
const schemaProject = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: "/default/default.png" },
    owner: { type: Types.ObjectId, required: true },
    team: { type: Types.ObjectId },
    private: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
module.exports.projectModel = model("project", schemaProject);

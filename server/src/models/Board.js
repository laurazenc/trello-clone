const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

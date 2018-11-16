const mongoose = require("mongoose");

const validBoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Board", validBoardSchema);

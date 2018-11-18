const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    boardId: { type: mongoose.Types.ObjectId, ref: 'Board' },
  },
  { timestamps: true },
);

export default mongoose.model('List', listSchema);

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  this.toString();
};

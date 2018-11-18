const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

boardSchema.methods = {
  async addList(listId) {
    this.lists.push(listId);
    await this.save();
  },
};

export default mongoose.model('Board', boardSchema);

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

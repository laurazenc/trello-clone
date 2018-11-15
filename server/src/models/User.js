const mongoose = require("mongoose");
const { hashSync, compareSync } = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    displayName: String,
    githubId: Number,
    photoUrl: String,
    accountLocked: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this.hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  }
};

export default mongoose.model("User", UserSchema);

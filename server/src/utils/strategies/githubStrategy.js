const passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
import User from "./../../models/User";
require("dotenv").config();

export const ghStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { id, displayName, photos } = profile;
    const existingUser = await User.findOne({ githubId: id });
    if (existingUser) return cb(null, existingUser);

    const user = new User({
      githubId: id,
      displayName,
      photoUrl: photos[0].value,
      confirmed: true
    });
    await user.save();
    return cb(null, user);
  }
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export const ghConnect = (req, res, next) => {
  return passport.authenticate("github");
};

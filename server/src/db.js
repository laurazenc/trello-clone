const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const dbUri = `mongodb://${
  process.env.NODE_ENV === "production" ? "mongo" : "localhost"
}:27017/${
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URI_TEST
    : process.env.DATABASE_URI
}`;

export const connectDatabase = () =>
  mongoose
    .connect(
      dbUri,
      { useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => {
      console.log(`[📚] Connected to Database ${dbUri}`);
    })
    .catch(err => {
      console.log("Not Connected to Database ERROR! ", err);
    });

mongoose.connection
  .once("open", () => console.log("[📚] Mongodb is up and running"))
  .on("error", console.error.bind(console, "[❌ ] MongoDB connection error:"));

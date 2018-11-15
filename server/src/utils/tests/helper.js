import mongoose from "mongoose";
process.env.NODE_ENV = "test";

require("dotenv").config();

const dbUri = `mongodb://localhost:27017/${process.env.DATABASE_URI_TEST}`;

export async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.connect(
    dbUri,
    { useNewUrlParser: true, useCreateIndex: true }
  );
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function disconnectMongoose() {
  await mongoose.disconnect();
  mongoose.connections.forEach(connection => {
    const modelNames = Object.keys(connection.models);

    modelNames.forEach(modelName => {
      delete connection.models[modelName];
    });

    const collectionNames = Object.keys(connection.collections);
    collectionNames.forEach(collectionName => {
      delete connection.collections[collectionName];
    });
  });

  const modelSchemaNames = Object.keys(mongoose.modelSchemas);
  modelSchemaNames.forEach(modelSchemaName => {
    delete mongoose.modelSchemas[modelSchemaName];
  });
}

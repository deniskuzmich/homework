import {SETTINGS} from "../core/settings/settings";
import mongoose from "mongoose";

export async function runDbMongoose() {
  try {
    await mongoose.connect(SETTINGS.MONGO_URL, {dbName: SETTINGS.DB_NAME})
    console.log("Mongoose Connected")
  } catch (err) {
    console.error('connection to db error' + err);
    await mongoose.disconnect();
  }
}

export async function stopDbMongoose() {
  await mongoose.disconnect();
}
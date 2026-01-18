import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {SessionType} from "../devices/types/session.type";

const SessionSchema = new mongoose.Schema<SessionType> ({
  userId: {type: String, required: true},
  deviceId: {type: String, required: true},
  deviceName: {type: String, required: true},
  refreshToken: {type: String},
  ip: {type: String},
  iat: {type: Number},
  eat: {type: Number},
})

type SessionModel = Model<SessionType>

export type SessionDocument = HydratedDocument<SessionType>

export const SessionModel = model<SessionType, SessionModel>('sessions', SessionSchema);
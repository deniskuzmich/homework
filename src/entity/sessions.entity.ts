import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {SessionType} from "../devices/types/session.type";

const SessionSchema = new mongoose.Schema<SessionType>({
  userId: {type: String, required: true},
  deviceId: {type: String, required: true},
  deviceName: {type: String, required: true},
  refreshToken: {type: String},
  ip: {type: String},
  iat: {type: Number},
  eat: {type: Number},
})

type SessionModel = Model<SessionType, {}, SessionMethods> & SessionStatic

export type SessionDocument = HydratedDocument<SessionType, SessionMethods>

interface SessionStatic {
  createSession(
    userId: string,
    deviceId: string,
    deviceName: string,
    refreshToken: string,
    ip: string | undefined,
    iat: number,
    eat: number,
  ): SessionDocument
}

interface SessionMethods {
  updateSession(
    deviceId: string,
    deviceName: string,
    refreshToken: string,
    ip: string,
    iat: number,
    eat: number,
  ): SessionDocument
}


class SessionEntity {
  private constructor(
    public userId: string,
    public deviceId: string,
    public deviceName: string,
    public refreshToken: string,
    public ip: string,
    public iat: number,
    public eat: number,
  ) {
  }

  static createSession(userId: string,
                       deviceId: string,
                       deviceName: string,
                       refreshToken: string,
                       ip: string,
                       iat: number,
                       eat: number,
  ): SessionDocument {
    const newSession = new SessionModel({
      userId,
      deviceId,
      deviceName,
      refreshToken,
      ip,
      iat,
      eat
    })

    return newSession
  }

  updateSession(
    this: SessionDocument,
    deviceId: string,
    deviceName: string,
    refreshToken: string,
    ip: string,
    iat: number,
    eat: number,
    ): boolean {
    this.deviceId = deviceId
    this.deviceName = deviceName
    this.refreshToken = refreshToken
    this.ip = ip
    this.iat = iat
    this.eat = eat

    return true
  }
}

SessionSchema.loadClass(SessionEntity);

export const SessionModel = model<SessionType, SessionModel>('sessions', SessionSchema);
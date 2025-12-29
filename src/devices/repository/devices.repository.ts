import {sessionsCollection} from "../../db/mongo.db";
import {SessionType} from "../types/session.type";


export const devicesRepository = {
  async createSession(session: SessionType) {
    return  await sessionsCollection.insertOne(session);
  },
  async findAllSessions() {
    return await sessionsCollection.find().toArray()
  },
  async findSession(deviceId: string) {
    return await sessionsCollection.findOne({deviceId: deviceId});
  },
  async deleteOneSession(deviceId: string) {
    const deletedSession = await sessionsCollection.deleteOne({deviceId: deviceId});
    if (deletedSession.deletedCount < 1) {
      return null
    }
    return true
  },
  async deleteAllSession(sessions: SessionType[]) {
    const deletedSessions = await sessionsCollection.deleteMany(sessions);
    if (deletedSessions.deletedCount < 1) {
      return null
    }
    return true
  },
}
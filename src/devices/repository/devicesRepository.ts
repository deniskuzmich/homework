import {sessionsCollection} from "../../db/mongo.db";
import {SessionType} from "../types/session.type";
import {UpdateSessionType} from "../types/update-session.type";


export class DevicesRepository {
   async findSession(deviceId: string) {
    return await sessionsCollection.findOne({deviceId: deviceId});
  }

   async createSession(session: SessionType) {
    return await sessionsCollection.insertOne(session);
  }

   async updateSession(deviceId: string, updatedSession: UpdateSessionType) {
    await sessionsCollection.updateOne(
      {deviceId},
      {$set: updatedSession}
    )
  }

   async deleteOneSession(deviceId: string) {
    const deletedSession = await sessionsCollection.deleteOne({deviceId: deviceId});
    if (deletedSession.deletedCount < 1) {
      return null
    }
    return true
  }

   async deleteAllSession(userId: string, deviceId: string) {
    const deletedSessions = await sessionsCollection.deleteMany({
      userId: userId,
      deviceId: {$ne: deviceId},
    });
    if (deletedSessions.deletedCount < 1) {
      return null
    }
    return true
  }
}
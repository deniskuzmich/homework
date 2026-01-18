import {injectable} from "inversify";
import {SessionDocument, SessionModel} from "../../entity/sessions.entity";

@injectable()
export class DevicesRepository {
  async save(session: SessionDocument) {
    await session.save();
    return
  }
   async findSession(deviceId: string): Promise<SessionDocument | null> {
    const session = await SessionModel.findOne({deviceId: deviceId});
     return session
  }

   async deleteOneSession(deviceId: string) {
    const deletedSession = await SessionModel.deleteOne({deviceId: deviceId});
    if (deletedSession.deletedCount < 1) {
      return null
    }
    return true
  }

   async deleteAllSession(userId: string, deviceId: string) {
    const deletedSessions = await SessionModel.deleteMany({
      userId: userId,
      deviceId: {$ne: deviceId},
    });
    if (deletedSessions.deletedCount < 1) {
      return null
    }
    return true
  }
}
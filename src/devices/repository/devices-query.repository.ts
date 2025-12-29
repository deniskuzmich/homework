import {sessionsCollection} from "../../db/mongo.db";
import {mapSessionToViewModel} from "../mapper/map-session-to-view-model";

export const devicesQueryRepository = {
  async findAllSessions(userId: string) {
    const sessions = await sessionsCollection.find({userId}).toArray()
    return sessions.map(mapSessionToViewModel)
  },
}
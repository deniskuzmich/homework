import {sessionsCollection} from "../../db/mongo.db";
import {mapSessionToViewModel} from "../mapper/map-session-to-view-model";

export class DevicesQueryRepository {
  async findAllSessions(userId: string) {
    const sessions = await sessionsCollection.find({userId}).toArray()
    return sessions.map(mapSessionToViewModel)
  }
}


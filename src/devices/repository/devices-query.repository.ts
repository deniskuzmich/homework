import {mapSessionToViewModel} from "../mapper/map-session-to-view-model";
import {injectable} from "inversify";
import {SessionModel} from "../../entity/sessions.entity";

@injectable()
export class DevicesQueryRepository {
  async findAllSessions(userId: string) {
    const sessions = await SessionModel.find({userId})
    return sessions.map(mapSessionToViewModel)
  }
}


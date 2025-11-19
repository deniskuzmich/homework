import {UserDbType} from "../../users/types/main-types/user-db-type";
import {WithId} from "mongodb";

declare global {
  namespace Express {
    export interface Request {
      user: WithId<UserDbType> | null
    }
  }
}

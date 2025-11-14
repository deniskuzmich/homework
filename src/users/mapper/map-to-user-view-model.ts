import {WithId} from "mongodb";
import {UserOutput} from "../types/main-types/user-output.type";
import {UserDbType} from "../types/main-types/user-db-type";

export function mapToUserViewModel(user: WithId<UserDbType>):UserOutput  {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  }
}
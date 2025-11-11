import {WithId} from "mongodb";
import {UserOutput} from "../types/main-types/user-output.type";
import {User} from "../types/main-types/user-db.type";

export function mapToUserViewModel(user: WithId<User>):UserOutput  {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  }
}
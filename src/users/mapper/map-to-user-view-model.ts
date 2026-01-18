import {UserOutput} from "../types/main-types/user-output.type";
import {UserDocument} from "../../entity/users.entity";

export function mapToUserViewModel(user: UserDocument):UserOutput  {
  return {
    id: user.id,
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  }
}
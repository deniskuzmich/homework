import {UserInfoType} from "../../users/types/output-types/user-info.type";

export const authService = {
  async getInfo (user: UserInfoType): Promise<UserInfoType> {
    return {
      userId: user.userId.toString(),
      login: user.login,
      email: user.email,
    }
  }
}
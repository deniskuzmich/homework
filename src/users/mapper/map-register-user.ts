
import {UserCreateType} from "../types/input-types/user-create-type";
import {UserDbType} from "../types/main-types/user-db-type";

export const mapRegisterUser = (data: UserCreateType): UserDbType => {
  return {
    login: data.login,
    email: data.email,
    createdAt: data.createdAt,
    passwordHash: data.passwordHash,
    emailConfirmation: {
      confirmationCode: '',
      expirationDate: new Date(),
      isConfirmed: true,
  }
}
}
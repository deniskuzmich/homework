import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";
import {UserDocument, UserModel} from "../entity/users.entity";


type RegisterUserPayloadType = {
  login: string,
  password: string,
  email: string,
  code?: string,
  expirationDate?: Date,
  isConfirmed?: boolean
}

export const testSeeder = {
  createUser() {
    return {
      login: 'testing',
      email: 'test@gmail.com',
      password: '123456789'
    }
  },

  async insertUser({
    login,
    email,
    password,
    code,
    expirationDate,
    isConfirmed
  }: RegisterUserPayloadType): Promise<UserDocument> {
    const newUser = new UserModel({
      login,
      email,
      passwordHash: password,
      createdAt: new Date(),
      emailConfirmation: {
        confirmationCode: code ?? randomUUID(),
        expirationDate: expirationDate ?? add(new Date(), {
          minutes: 30,
        }),
        isConfirmed: isConfirmed ?? false
      }
    })

    await newUser.save()
    return newUser
  }
}
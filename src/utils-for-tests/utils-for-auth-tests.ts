import {UserDbType} from "../users/types/main-types/user-db-type";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";
import {WithId} from "mongodb";
import {usersCollection} from "../db/mongo.db";

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
  }: RegisterUserPayloadType): Promise<UserDbType> {
    const newUser = {
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
  };
    const res = await usersCollection.insertOne({...newUser});
    return {
      _id: res.insertedId,
      ...newUser
    } as WithId<UserDbType>
  }
}
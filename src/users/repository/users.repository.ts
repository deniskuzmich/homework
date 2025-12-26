import {sessionsCollection, usersCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {UserDbType} from "../types/main-types/user-db-type";
import {add} from "date-fns/add";
import {SessionType} from "../../devices/types/session.type";


export const usersRepository = {
  async getUserById(id: string): Promise<WithId<UserDbType> | null> {
    if (!ObjectId.isValid(id)) return null;
    return usersCollection.findOne({_id: new ObjectId(id)});
  },

  async getLoginUser(login: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({login: login})
  },

  async getEmailUser(email: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({email: email})
  },

  async getUserByConfirmationCode(code: string) {
    const user = await usersCollection.findOne({"emailConfirmation.confirmationCode": code})
    return user
  },

  async getUserByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDbType> | null> {
    const user = await usersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]});
    return user;
  },

  async createUser(newUser: UserDbType): Promise<WithId<UserDbType>> {
    const insertResult = await usersCollection.insertOne(newUser);
    return {...newUser, _id: insertResult.insertedId}
  },

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedUser.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  },

  async updateConfirmation(_id: ObjectId) {
    let result = await usersCollection.updateOne({_id}, {$set: {'emailConfirmation.isConfirmed': true}});
    return result.modifiedCount === 1
  },

  async updateConfirmationCode(_id: ObjectId, newCode: string) {
    return usersCollection.updateOne({_id}, {
      $set: {
        'emailConfirmation.confirmationCode': newCode,
        'emailConfirmation.expirationDate': add(new Date(), {
          hours: 3,
          minutes: 30,
        })
      }
    })
  },
  async updateRefreshToken(userId: string, updatedSession: SessionType) {
    await sessionsCollection.updateOne(
      {_id: new ObjectId(userId)},
      {$set: {updatedSession}}
    )
  },
  async unsetRefreshToken(refreshToken: string) {
    await usersCollection.updateOne(
      {refreshToken},
      {$set: {refreshToken: null}}
    )
  },
  async createSession(session: SessionType) {
    return  await sessionsCollection.insertOne(session);
  },
}
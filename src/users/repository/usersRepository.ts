import {usersCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {UserDbType} from "../types/main-types/user-db-type";
import {add} from "date-fns/add";


export class UsersRepository {
  static async getUserById(id: string): Promise<WithId<UserDbType> | null> {
    if (!ObjectId.isValid(id)) return null;
    return usersCollection.findOne({_id: new ObjectId(id)});
  }

  static async getLoginUser(login: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({login: login})
  }

  static async getEmailUser(email: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({email: email})
  }

  static async getUserByConfirmationCode(code: string) {
    const user = await usersCollection.findOne({"emailConfirmation.confirmationCode": code})
    return user
  }

  static async getUserByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDbType> | null> {
    const user = await usersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]});
    return user;
  }

  static async createUser(newUser: UserDbType): Promise<WithId<UserDbType>> {
    const insertResult = await usersCollection.insertOne(newUser);
    return {...newUser, _id: insertResult.insertedId}
  }

  static async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedUser.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  }

  static async updateConfirmation(_id: ObjectId) {
    let result = await usersCollection.updateOne({_id}, {$set: {'emailConfirmation.isConfirmed': true}});
    return result.modifiedCount === 1
  }

  static async updateConfirmationCode(_id: ObjectId, newCode: string) {
    return usersCollection.updateOne({_id}, {
      $set: {
        'emailConfirmation.confirmationCode': newCode,
        'emailConfirmation.expirationDate': add(new Date(), {
          hours: 3,
          minutes: 30,
        })
      }
    })
  }
}
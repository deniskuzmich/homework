import {usersCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {UserDbType} from "../types/main-types/user-db-type";
import {add} from "date-fns/add";
import {injectable} from "inversify";

@injectable()
export class UsersRepository {
   async getUserById(id: string): Promise<WithId<UserDbType> | null> {
    if (!ObjectId.isValid(id)) return null;
    return usersCollection.findOne({_id: new ObjectId(id)});
  }

   async getLoginUser(login: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({login: login})
  }

   async getEmailUser(email: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({email: email})
  }

   async getUserByConfirmationCode(code: string) {
    const user = await usersCollection.findOne({"emailConfirmation.confirmationCode": code})
    return user
  }

  async getUserByRecoveryCode(code: string) {
    const user = await usersCollection.findOne({"passwordRecovery.recoveryCode": code})
    return user
  }

   async getUserByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDbType> | null> {
    const user = await usersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]});
    return user;
  }

   async createUser(newUser: UserDbType): Promise<WithId<UserDbType>> {
    const insertResult = await usersCollection.insertOne(newUser);
    return {...newUser, _id: insertResult.insertedId}
  }

   async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedUser.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  }

   async updateConfirmation(_id: ObjectId) {
    let result = await usersCollection.updateOne({_id}, {$set: {'emailConfirmation.isConfirmed': true}});
    return result.modifiedCount === 1
  }

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
  }

  async updateCodeForPasswordRecovery(email: string, newCode: string) {
    return usersCollection.updateOne({email}, {
      $set: {
        'passwordRecovery.recoveryCode': newCode,
        'passwordRecovery.expirationDate': add(new Date(), {
          hours: 0,
          minutes: 5,
        })
      }
    })
  }

  async createNewPassword(_id: ObjectId, newPassword: string) {
     return usersCollection.updateOne({_id}, {
       $set: {
         'passwordHash': newPassword,
       }
     })
  }

  async clearRecoveryData(_id: ObjectId) {
     return usersCollection.updateOne({_id}, {
       $set: {
         'passwordRecovery.recoveryCode': null,
         'passwordRecovery.expirationDate': null,
       }
     });
  }
}


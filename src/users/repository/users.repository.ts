import {usersCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {UserDbType} from "../types/main-types/user-db-type";
import {UserCreateType} from "../types/input-types/user-create-type";

export const usersRepository = {
  async createUser(newUser: UserCreateType): Promise<UserDbType> {
    const insertResult = await usersCollection.insertOne(newUser);
    const createdUser: UserDbType = {
      _id: insertResult.insertedId,
      login: newUser.login,
      email: newUser.email,
      passwordHash: newUser.passwordHash,
      createdAt: newUser.createdAt,
    };

    return createdUser;
  },

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedUser.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  }
}
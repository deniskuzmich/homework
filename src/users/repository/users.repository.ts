import {UsersInput} from "../types/main-types/user-Input.type";
import {usersCollection} from "../../db/mongo.db";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {UserOutput} from "../types/main-types/user-output.type";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {userForFrontMapper} from "../mapper/map-user-for-front";
import {ObjectId, WithId} from "mongodb";
import {User} from "../types/main-types/user-db.type";




export const usersRepository = {
  async getAllUsers(queryDto: UsersInput): Promise<OutputTypeWithPagination<UserOutput>> {
    const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;

    const searchFilter =
      queryDto.searchLoginTerm ? {
        name: {
          $regex: queryDto.searchLoginTerm,
          $options: "i",
        }
      } : {} //если строка поиска пустая - возвращаем все блоги

    const items = await usersCollection //запрос в db
      .find(searchFilter)
      .skip(skip)
      .limit(queryDto.pageSize)
      .sort({[queryDto.sortBy]: queryDto.sortDirection})
      .toArray();

    const totalCount = await usersCollection.countDocuments(searchFilter) //общее кол-во элементов

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / queryDto.pageSize),
      page: queryDto.pageNumber,
      pageSize: queryDto.pageSize,
      totalCount: totalCount,
    }

    const userForFront = items.map(mapToUserViewModel)
    return userForFrontMapper(userForFront, paramsForFront);
  },

  async getUserById(id: string): Promise<WithId<User> | null> {
    return usersCollection.findOne({_id: new ObjectId(id)});
  },

  async createUser(newUser: User): Promise<WithId<User>> {
    const insertResult = await usersCollection.insertOne(newUser);
    return {...newUser, _id: insertResult.insertedId};
  },

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedUser.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  }
}
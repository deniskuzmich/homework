import {ObjectId, WithId} from "mongodb";
import {UserDbType} from "../types/main-types/user-db-type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {UserOutput} from "../types/main-types/user-output.type";
import {UsersInput} from "../types/main-types/user-Input.type";
import {usersCollection} from "../../db/mongo.db";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {userForFrontMapper} from "../mapper/map-user-for-front";

export const usersQueryRepository = {
  async getAllUsers(queryDto: UsersInput): Promise<OutputTypeWithPagination<UserOutput>> {
    const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;

    let searchFilter =
      queryDto.searchLoginTerm ? {
        login: {$regex: queryDto.searchLoginTerm, $options: "i",}
      } : {}
    queryDto.searchEmailTerm ? {
      login: {$regex: queryDto.searchEmailTerm, $options: "i",}
      } : {} //если ничего нет, нужно вернуть пустой объект


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

  async getUserById(id: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({_id: new ObjectId(id)});
  },

  async getLoginUser(login: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({login: login})
  },

  async getEmailUser(email: string): Promise<WithId<UserDbType> | null> {
    return usersCollection.findOne({email: email})
  },

  async getUserByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDbType> | null> {
    const user = await usersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]});
    return user;
  }
}


import {ObjectId} from "mongodb";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {UserOutput} from "../types/main-types/user-output.type";
import {UsersInput} from "../types/main-types/user-Input.type";
import {usersCollection} from "../../db/mongo.db";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {userForFrontMapper} from "../mapper/map-user-for-front";

export class UsersQueryRepository {
  async getAllUsers(queryDto: UsersInput): Promise<OutputTypeWithPagination<UserOutput>> {
    const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;

    let searchFilter = {}

    if(queryDto.searchLoginTerm || queryDto.searchEmailTerm) {
      searchFilter = {
        $or: [
          { login: { $regex: queryDto.searchLoginTerm, $options: "i" } },
          { email: { $regex: queryDto.searchEmailTerm, $options: "i" } },
        ]
      }
    } else if (queryDto.searchLoginTerm) {
      searchFilter =  { login: { $regex: queryDto.searchLoginTerm, $options: "i" } }
    } else if (queryDto.searchEmailTerm) {
      searchFilter = { email: { $regex: queryDto.searchEmailTerm, $options: "i" } }
    }

    const itemsFromDb = await usersCollection //запрос в db
      .find(searchFilter)
      .skip(skip)
      .limit(queryDto.pageSize)
      .sort({[queryDto.sortBy]: queryDto.sortDirection}) //ключ: значение
      .toArray();

    const totalCount = await usersCollection.countDocuments(searchFilter) //общее кол-во элементов

    const paramsForFront = { //мазоль, которая идет во фронт
      pagesCount: Math.ceil(totalCount / queryDto.pageSize),
      page: queryDto.pageNumber,
      pageSize: queryDto.pageSize,
      totalCount: totalCount,
    }

    const userForFront = itemsFromDb.map(mapToUserViewModel)
    return userForFrontMapper(userForFront, paramsForFront);
  }

  async getUserById(id: string): Promise<UserOutput | null> {
    if(!ObjectId.isValid(id)) return null;
    const user = await usersCollection.findOne({_id: new ObjectId(id)});
    if(!user) return null;
    return mapToUserViewModel(user);
  }
}



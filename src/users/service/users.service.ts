import {UsersInput} from "../types/main-types/user-Input.type";
import {UserQueryInput} from "../types/input-types/user-query-input.type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {UserOutput} from "../types/main-types/user-output.type";
import {usersRepository} from "../repository/users.repository";
import {User} from "../types/main-types/user-db.type";
import {UserInputDto} from "../types/input-types/user-input-dto.type";
import {WithId} from "mongodb";

export const usersService = {
  async getAllUsers(queryDto: UserQueryInput): Promise<OutputTypeWithPagination<UserOutput>> {
    const foundUsers: UsersInput = {
      sortBy: queryDto.sortBy ?? 'createdAt',
      sortDirection: queryDto.sortDirection ?? 'desc',
      pageNumber: queryDto.pageNumber ? Number(queryDto.pageNumber) : 1,
      pageSize: queryDto.pageSize ? Number(queryDto.pageSize) : 10,
      searchLoginTerm: queryDto.searchLoginTerm ?? null,
      searchEmailTerm: queryDto.searchEmailTerm ?? null
    }
    return usersRepository.getAllUsers(foundUsers);
},
  async createUser(queryDto: UserInputDto): Promise<WithId<User>> {
    const newUser = {
      login: queryDto.login,
      email: queryDto.email,
      password: queryDto.password,
      createdAt: new Date().toISOString()
    }
    const createdUser = await usersRepository.createUser(newUser);
    return createdUser;
  },

  async getUserById(id: string): Promise<WithId<User> | null> {
    return usersRepository.getUserById(id);
  },

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersRepository.deleteUser(id);
  }
}
import {UsersInput} from "../types/main-types/user-Input.type";
import {UserQueryInput} from "../types/input-types/user-query-input.type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {UserOutput} from "../types/main-types/user-output.type";
import {usersRepository} from "../repository/users.repository";
import {UserDbType} from "../types/main-types/user-db-type";
import {UserInputDto} from "../types/input-types/user-input-dto.type";
import {WithId} from "mongodb";
import {usersQueryRepository} from "../repository/users-query.repository";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {ErrorTypeOutput} from "../../core/types/error-types/ErrorTypeOutput";
import {bcryptService} from "../../common/services/bcrypt.service";


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
    return usersQueryRepository.getAllUsers(foundUsers);
  },
  async createUser(queryDto: UserInputDto): Promise<WithId<UserDbType> | ErrorTypeOutput> {
    const isLoginExists = await usersQueryRepository.getLoginUser(queryDto.login)
    if (isLoginExists) {
      return {
        errorsMessages: [
          {field: "login", message: "login should be unique"}
        ]
      }
    }

    const isEmailExists = await usersQueryRepository.getEmailUser(queryDto.email)
    if (isEmailExists) {
      return {
        errorsMessages: [
          {field: "email", message: "email should be unique"}
        ]
      }
    }

    const passwordHash = await bcryptService.generateHash(queryDto.password);
    const newUser = {
      login: queryDto.login,
      email: queryDto.email,
      passwordHash,
      createdAt: new Date().toISOString()
    }
    return await usersRepository.createUser(newUser);
  },

  async getUserById(id: string): Promise<WithId<UserDbType> | null> {
    return usersQueryRepository.getUserById(id);
  },

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersRepository.deleteUser(id);
  },

  async checkCredentials(loginOrEmail: string, password: string): Promise<UserOutput | null> {
    const user = await usersQueryRepository.getUserByLoginOrEmail(loginOrEmail);
    if (!user) return null;

    const passwordHash = await bcryptService.generateHash(password);
    const isPassCorrect = await bcryptService.checkPassword(password, passwordHash);
    if(!isPassCorrect) return null;

    return mapToUserViewModel(user)
  }
}


import {UsersInput} from "../types/main-types/user-Input.type";
import {UserQueryInput} from "../types/input-types/user-query-input.type";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {UserOutput} from "../types/main-types/user-output.type";
import {usersRepository} from "../repository/users.repository";
import {UserDbType} from "../types/main-types/user-db-type";
import {UserInputDto} from "../types/input-types/user-input-dto.type";
import {WithId} from "mongodb";
import {mapToUserViewModel} from "../mapper/map-to-user-view-model";
import {ErrorTypeOutput} from "../../core/types/error-types/ErrorTypeOutput";
import {bcryptService} from "../../common/services/bcrypt.service";
import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";

export const usersService = {
  async createUser(queryDto: UserInputDto): Promise<UserDbType | ErrorTypeOutput> {
    const isLoginExists = await usersRepository.getLoginUser(queryDto.login)
    if (isLoginExists) {
      return {
        errorsMessages: [
          {field: "login", message: "login should be unique"}
        ]
      }
    }

    const isEmailExists = await usersRepository.getEmailUser(queryDto.email)
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
    if (!id) return null
    return usersRepository.getUserById(id);
  },

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersRepository.deleteUser(id);
  },

  async checkCredentials(loginOrEmail: string, password: string): Promise<ResultType<UserOutput | null>> {
    const user = await usersRepository.getUserByLoginOrEmail(loginOrEmail);
    if (!user) {
      return {
        status: ResultStatus.Unauthorized,
        extensions: [],
        data: null
      }
    }

    const isPassCorrect = await bcryptService.checkPassword(password, user.passwordHash);
    if(!isPassCorrect) {
      return {
        status: ResultStatus.Unauthorized,
        extensions: [{field: 'auth', message: 'Bad request to login'}],
        data: null
      }
    }
    const result =  mapToUserViewModel(user)
    return {
      status: ResultStatus.Success,
      extensions: [],
      data: result
    }
  }
}


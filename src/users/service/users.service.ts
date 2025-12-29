import {usersRepository} from "../repository/users.repository";
import {UserDbType} from "../types/main-types/user-db-type";
import {UserInputDto} from "../types/input-types/user-input-dto.type";
import {WithId} from "mongodb";
import {ErrorTypeOutput} from "../../core/types/error-types/ErrorTypeOutput";
import {bcryptService} from "../../common/services/bcrypt.service";
import {mapRegisterUser} from "../mapper/map-register-user";

export const usersService = {
  async createUser(queryDto: UserInputDto): Promise<WithId<UserDbType> | ErrorTypeOutput> {
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
      createdAt: new Date()
    }
    const mappedUser = mapRegisterUser(newUser)
    return await usersRepository.createUser(mappedUser);
  },

  async getUserById(id: string): Promise<WithId<UserDbType> | null> {
    if (!id) return null
    return usersRepository.getUserById(id);
  },

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await usersRepository.deleteUser(id);
  },
}


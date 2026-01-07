import {UsersRepository} from "../repository/usersRepository";
import {UserDbType} from "../types/main-types/user-db-type";
import {UserInputDto} from "../types/input-types/user-input-dto.type";
import {WithId} from "mongodb";
import {ErrorTypeOutput} from "../../core/types/error-types/ErrorTypeOutput";
import {mapRegisterUser} from "../mapper/map-register-user";
import {bcryptService} from "../../core/composition/composition-root";

export class UsersService {
  async createUser(queryDto: UserInputDto): Promise<WithId<UserDbType> | ErrorTypeOutput> {
    const isLoginExists = await UsersRepository.getLoginUser(queryDto.login)
    if (isLoginExists) {
      return {
        errorsMessages: [
          {field: "login", message: "login should be unique"}
        ]
      }
    }

    const isEmailExists = await UsersRepository.getEmailUser(queryDto.email)
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
    return await UsersRepository.createUser(mappedUser);
  }

  async getUserById(id: string): Promise<WithId<UserDbType> | null> {
    if (!id) return null
    return UsersRepository.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await UsersRepository.deleteUser(id);
  }
}


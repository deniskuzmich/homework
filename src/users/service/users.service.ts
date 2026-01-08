import {UserDbType} from "../types/main-types/user-db-type";
import {UserInputDto} from "../types/input-types/user-input-dto.type";
import {WithId} from "mongodb";
import {ErrorTypeOutput} from "../../core/types/error-types/ErrorTypeOutput";
import {mapRegisterUser} from "../mapper/map-register-user";
import {BcryptService} from "../../common/services/bcrypt.service";
import {UsersRepository} from "../repository/usersRepository";

export class UsersService {
  bcryptService: BcryptService;
  usersRepository: UsersRepository;

  constructor(bcryptService: BcryptService, usersRepository: UsersRepository) {
    this.bcryptService = bcryptService;
    this.usersRepository = usersRepository;
  }
  async createUser(queryDto: UserInputDto): Promise<WithId<UserDbType> | ErrorTypeOutput> {
    const isLoginExists = await this.usersRepository.getLoginUser(queryDto.login)
    if (isLoginExists) {
      return {
        errorsMessages: [
          {field: "login", message: "login should be unique"}
        ]
      }
    }

    const isEmailExists = await this.usersRepository.getEmailUser(queryDto.email)
    if (isEmailExists) {
      return {
        errorsMessages: [
          {field: "email", message: "email should be unique"}
        ]
      }
    }

    const passwordHash = await this.bcryptService.generateHash(queryDto.password);

    const newUser = {
      login: queryDto.login,
      email: queryDto.email,
      passwordHash,
      createdAt: new Date()
    }
    const mappedUser = mapRegisterUser(newUser)
    return await this.usersRepository.createUser(mappedUser);
  }

  async getUserById(id: string): Promise<WithId<UserDbType> | null> {
    if (!id) return null
    return this.usersRepository.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await this.usersRepository.deleteUser(id);
  }
}


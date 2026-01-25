import {UserInputDto} from "../types/input-types/user-input-dto.type";
import {ErrorTypeOutput} from "../../core/types/error-types/ErrorTypeOutput";
import {BcryptService} from "../../common/services/bcrypt.service";
import {UsersRepository} from "../repository/usersRepository";
import {inject, injectable} from "inversify";
import {UserDocument, UserModel} from "../../entity/users.entity";

@injectable()
export class UsersService {

  constructor(
    @inject(BcryptService)
    public bcryptService: BcryptService,
    @inject(UsersRepository)
    public usersRepository: UsersRepository) {
  }

  async createUser(queryDto: UserInputDto): Promise<UserDocument | ErrorTypeOutput> {
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

    const newUser = UserModel.createUserBySuperAdmin(queryDto, passwordHash);

    return await this.usersRepository.save(newUser);
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    if (!id) return null
    const user = await this.usersRepository.getUserById(id);
    return user
  }

  async deleteUser(id: string): Promise<void> {
    return await this.usersRepository.deleteUser(id);
  }
}


import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {add} from "date-fns/add";
import {ResultStatus} from "../../common/types/result.status";
import {randomUUID} from "node:crypto";
import {ResultType} from "../../common/types/result.type";
import {emailExamples} from "../../adapters/email-examples";
import {UserOutput} from "../../users/types/main-types/user-output.type";
import {mapToUserViewModel} from "../../users/mapper/map-to-user-view-model";
import {BcryptService} from "../../common/services/bcrypt.service";
import {NodemailerService} from "../../adapters/nodemailer-service";
import {UsersRepository} from "../../users/repository/usersRepository";
import {inject, injectable} from "inversify";
import {UserDocument, UserModel} from "../../entity/users.entity";

@injectable()
export class AuthService {

  constructor(
    @inject(BcryptService)
    public bcryptService: BcryptService,
    @inject(NodemailerService)
    public nodemailerService: NodemailerService,
    @inject(UsersRepository)
    public usersRepository: UsersRepository) {
  }

  async getInfo(user: UserInfoType): Promise<UserInfoType> {
    return {
      userId: user.userId.toString(),
      login: user.login,
      email: user.email
    }
  }

  async registerUser(login: string, email: string, password: string): Promise<ResultType<UserDocument | null>> {
    const isLoginExists = await this.usersRepository.getLoginUser(login)
    if (isLoginExists) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'login', message: "login is already exists"}],
        data: null
      }
    }
    const isEmailExists = await this.usersRepository.getEmailUser(email)
    if (isEmailExists) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'email', message: "email is already exists"}],
        data: null
      }
    }

    const passwordHash = await this.bcryptService.generateHash(password)

    const newUser = new UserModel({
      login,
      email,
      passwordHash,
      createdAt: new Date(),
      passwordRecovery: {
        recoveryCode: null,
        expirationDate: null,
      },
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 3,
          minutes: 30,
        }),
        isConfirmed: false,
      }
    })
    await this.usersRepository.save(newUser)

    try {
      await this.nodemailerService.sendEmail(
        newUser.email,
        emailExamples.registrationEmail(newUser.emailConfirmation.confirmationCode)
      )
    } catch (e) {
      console.log('Send email error', e)
    }
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null,
    }
  }

  async checkCredentials(loginOrEmail: string, password: string): Promise<ResultType<UserOutput | null>> {
    const user = await this.usersRepository.getUserByLoginOrEmail(loginOrEmail);
    if (!user) {
      return {
        status: ResultStatus.Unauthorized,
        extensions: [],
        data: null
      }
    }
    const isPassCorrect = await this.bcryptService.checkPassword(password, user.passwordHash);
    if (!isPassCorrect) {
      return {
        status: ResultStatus.Unauthorized,
        extensions: [{field: 'auth', message: 'Bad request to password'}],
        data: null
      }
    }

    const result = mapToUserViewModel(user)
    return {
      status: ResultStatus.Success,
      extensions: [],
      data: result
    }
  }

  async confirmEmail(code: string): Promise<ResultType<boolean>> {
    const user = await this.usersRepository.getUserByConfirmationCode(code)
    if (!user) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'code', message: 'The user data in not correct'}],
        data: false,
      }
    }
    if (user.emailConfirmation.isConfirmed) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'code', message: 'The code is already applied'}],
        data: false,
      }
    }
    if (user.emailConfirmation.confirmationCode !== code) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'code', message: 'The code is incorrect'}],
        data: false,
      }
    }
    if (user.emailConfirmation.expirationDate < new Date()) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'code', message: 'The code is expired'}],
        data: false,
      }
    }

    user.emailConfirmation.isConfirmed = true

    await this.usersRepository.save(user)
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: true,
    }
  }

  async resendEmail(email: string) {
    const user = await this.usersRepository.getUserByLoginOrEmail(email)
    if (!user) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'email', message: 'This login or email is not exist'}],
        data: false,
      }
    }
    if (user.emailConfirmation.isConfirmed)
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'email', message: 'This email is already confirmed'}],
        data: false,
      }

    const newCode = randomUUID()

    user.emailConfirmation.confirmationCode = newCode
    user.emailConfirmation.expirationDate = add(new Date(), {
      hours: 3,
      minutes: 30,
    })

    await this.usersRepository.save(user)

    try {
      await this.nodemailerService.sendEmail(
        user.email,
        emailExamples.registrationEmail(newCode)
      )
    } catch (e) {
      console.log('Send email error', e)
    }
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: true,
    }
  }

  async passwordRecovery(email: string) {
    const user = await this.usersRepository.getUserByLoginOrEmail(email)
    if (!user) {
      return {
        status: ResultStatus.NoContent,
        extensions: [],
        data: true,
      }
    }

    const newCode = randomUUID()

    user.passwordRecovery!.recoveryCode = newCode
    user.passwordRecovery!.expirationDate = add(new Date(), {
      hours: 0,
      minutes: 30,
    })

    await this.usersRepository.save(user)

    try {
      await this.nodemailerService.sendEmail(
        user.email,
        emailExamples.passwordRecovery(newCode)
      )
    } catch (e) {
      console.log('Send password recovery error', e)
    }
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: true,
    }
  }

  async newPassword(newPassword: string, recoveryCode: string) {
    const user = await this.usersRepository.getUserByRecoveryCode(recoveryCode)
    if (!user) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'recoveryCode', message: 'recovery code is not correct'}],
        data: true,
      }
    }
    const passwordHash = await this.bcryptService.generateHash(newPassword)

    user.passwordHash = passwordHash
    user.passwordRecovery!.recoveryCode = null
    user.passwordRecovery!.expirationDate = null
    //Create new passWord and clear recoveryData
    await this.usersRepository.save(user)

    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: true,
    }

  }
}


import {UserInfoType} from "../../users/types/output-types/user-info.type";
import {bcryptService} from "../../common/services/bcrypt.service";
import {add} from "date-fns/add";
import {usersRepository} from "../../users/repository/users.repository";
import {ResultStatus} from "../../common/types/result.status";
import {randomUUID} from "node:crypto";
import {UserDbType} from "../../users/types/main-types/user-db-type";
import {ResultType} from "../../common/types/result.type";
import {nodemailerService} from "../../adapters/nodemailer-service";
import {emailExamples} from "../../adapters/email-examples";
import {UserOutput} from "../../users/types/main-types/user-output.type";
import {mapToUserViewModel} from "../../users/mapper/map-to-user-view-model";

export const authService = {
  async getInfo(user: UserInfoType): Promise<UserInfoType> {
    return {
      userId: user.userId.toString(),
      login: user.login,
    }
  },
  async registerUser(login: string, email: string, password: string): Promise<ResultType<UserDbType | null>> {
    const isLoginExists = await usersRepository.getLoginUser(login)
    if (isLoginExists) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'login', message: "login is already exists"}],
        data: null
      }
    }
    const isEmailExists = await usersRepository.getEmailUser(email)
    if (isEmailExists) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'email', message: "email is already exists"}],
        data: null
      }
    }

    const passwordHash = await bcryptService.generateHash(password)

    const newUser: UserDbType = {
      login,
      email,
      passwordHash,
      createdAt: new Date(),
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 3,
          minutes: 30,
        }),
        isConfirmed: false,
      }
    }
    await usersRepository.createUser(newUser)

    try {
      await nodemailerService.sendEmail(
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
        extensions: [{field: 'auth', message: 'Bad request to password'}],
        data: null
      }
    }

    const result =  mapToUserViewModel(user)
    return {
      status: ResultStatus.Success,
      extensions: [],
      data: result
    }
  },

  async confirmEmail(code: string): Promise<ResultType<boolean>> {
    const user = await usersRepository.getUserByConfirmationCode(code)
    if (!user) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'code', message: 'The user data in not correct'}],
        data: false,
      }
    }
    if(user.emailConfirmation.isConfirmed) {
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

    let result = await usersRepository.updateConfirmation(user._id)
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: result,
    }
  },
  async resendEmail(email: string) {
    const user = await usersRepository.getUserByLoginOrEmail(email)
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

    await usersRepository.updateConfirmationCode(user._id, newCode)
    try {
      await nodemailerService.sendEmail(
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
}
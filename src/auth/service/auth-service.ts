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

export const authService = {
  async getInfo(user: UserInfoType): Promise<UserInfoType> {
    return {
      userId: user.userId.toString(),
      login: user.login,
    }
  },
  async registerUser(login: string, email: string, password: string): Promise<ResultType<UserDbType | null>> {
    const checkUser = await usersRepository.getUserByLoginOrEmail(login)
    if (checkUser) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: 'User is already exists',
        extensions: [{field: 'Auth User', message: 'User is already exists'}],
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
        newUser.emailConfirmation.confirmationCode,
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
  async confirmEmail(code: string, email: string): Promise<ResultType<boolean>> {
    const user = await usersRepository.getUserByLoginOrEmail(email)
    if (!user) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'email confirm', message: 'The user data in not correct'}],
        data: false,
      }
    }
    if(user.emailConfirmation.isConfirmed) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'email confirm', message: 'The code is already applied'}],
        data: false,
      }
    }
    if (user.emailConfirmation.confirmationCode !== code) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'email confirm', message: 'The code is incorrect'}],
        data: false,
      }
    }
    if (user.emailConfirmation.expirationDate < new Date()) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'email confirm', message: 'The code is expired'}],
        data: false,
      }
    }

    await usersRepository.updateConfirmation(user._id)
    return {
      status: ResultStatus.Success,
      extensions: [],
      data: true,
    }
  },
  async resendEmail(email: string) {
    const user = await usersRepository.getUserByLoginOrEmail(email)
    if (!user) return false
    try {
      await nodemailerService.sendEmail(
        user.email,
        user.emailConfirmation.confirmationCode,
        emailExamples.registrationEmail(user.emailConfirmation.confirmationCode)
      )
    } catch (e) {
      console.log('Send email error', e)
    }
    return
  }
}
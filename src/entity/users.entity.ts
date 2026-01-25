import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {UserDbType} from "../users/types/main-types/user-db-type";
import {UserInputDto} from "../users/types/input-types/user-input-dto.type";
import {ResultType} from "../common/types/result.type";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";

const UserSchema = new mongoose.Schema<UserDbType>({
  login: {type: String, required: true},
  email: {type: String, required: true},
  createdAt: {type: Date, required: true},
  passwordHash: {type: String, required: true},
  refreshToken: {type: String},
  passwordRecovery: {
    recoveryCode: {type: String, default: null},
    expirationDate: {type: Date, default: null},
  },
  emailConfirmation: {
    confirmationCode: {type: String},
    expirationDate: {type: Date},
    isConfirmed: {type: Boolean},
  }
})

export type UserDocument = HydratedDocument<UserDbType>;

interface UserStatic {
  createUserBySuperAdmin(queryDto: UserInputDto, passwordHash: string): UserDocument
  createUser(login: string, email: string, password: string): UserDocument
}

type UserModel = Model<UserDbType> & UserStatic

class UserEntity {
  private constructor(
    public login: string,
    public email: string,
    public createdAt: Date,
    public passwordHash: string,
    public refreshToken: string,
    public passwordRecovery: {
      recoveryCode: string,
      expirationDate: string,
    },
    public emailConfirmation: {
      confirmationCode: string,
      expirationDate: Date,
      isConfirmed: boolean,
    }
  ) {}

  static createUserBySuperAdmin(queryDto: UserInputDto, passwordHash: string): UserDocument {
    const newUser = new UserModel({
      login: queryDto.login,
      email: queryDto.email,
      passwordHash,
      createdAt: new Date(),
      passwordRecovery: {
        recoveryCode: null,
        expirationDate: null,
      },
      emailConfirmation: {
        confirmationCode: '',
        expirationDate: new Date(),
        isConfirmed: true,
      }
    })

    return newUser
  }

  static createUser(login: string, email: string, passwordHash: string): UserDocument {
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

    return newUser
  }
}

UserSchema.loadClass(UserEntity)

export const UserModel = model<UserDbType, UserModel>('users', UserSchema);


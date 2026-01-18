import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {UserDbType} from "../users/types/main-types/user-db-type";

const UserSchema = new mongoose.Schema<UserDbType> ({
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

type UserModel = Model<UserDbType>

export type UserDocument = HydratedDocument<UserDbType>

export const UserModel = model<UserDbType, UserModel>('users', UserSchema);
import {add} from "date-fns/add";

export type UserDbType = {
  login: string;
  email: string;
  createdAt: Date;
  passwordHash: string;
  refreshToken?: string | null;
  passwordRecovery?: {
    recoveryCode: string | null,
    expirationDate: Date
  },
  emailConfirmation: {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean,
  }
}


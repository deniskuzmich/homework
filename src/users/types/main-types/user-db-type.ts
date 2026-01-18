
export type UserDbType = {
  login: string;
  email: string;
  createdAt: Date;
  passwordHash: string;
  refreshToken?: string | null;
  passwordRecovery?: {
    recoveryCode: string | null,
    expirationDate: Date | null
  },
  emailConfirmation: {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean,
  }
}


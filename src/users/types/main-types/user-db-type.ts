export type UserDbType = {
  login: string;
  email: string;
  createdAt: Date;
  passwordHash: string;
  refreshToken?: string | null;
  passwordRecoveryCode?: string | null,
  emailConfirmation: {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean,
  }
}
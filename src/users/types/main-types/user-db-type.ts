export type UserDbType = {
  login: string;
  email: string;
  createdAt: Date;
  passwordHash: string;
  refreshToken?: string;
  emailConfirmation: {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean,
  }
}
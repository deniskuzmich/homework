export type UserDbType = {
  login: string;
  email: string;
  createdAt: Date;
  passwordHash: string;
  emailConfirmation: {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean,
  }
}
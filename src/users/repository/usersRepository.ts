import {injectable} from "inversify";
import {UserDocument, UserModel} from "../../entity/users.entity";

@injectable()
export class UsersRepository {
  async save(user: UserDocument): Promise<UserDocument> {
    await user.save()
    return user
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    return UserModel.findOne({_id: id});
  }

  async getLoginUser(login: string): Promise<UserDocument | null> {
    return UserModel.findOne({login: login})
  }

  async getEmailUser(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({email: email})
  }

  async getUserByConfirmationCode(code: string) {
    const user = await UserModel.findOne({"emailConfirmation.confirmationCode": code})
    return user
  }

  async getUserByRecoveryCode(code: string) {
    const user = await UserModel.findOne({"passwordRecovery.recoveryCode": code})
    return user
  }

  async getUserByLoginOrEmail(loginOrEmail: string): Promise<UserDocument | null> {
    const user = await UserModel.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]});
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await UserModel.deleteOne({_id: id});
    if (deletedUser.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  }
}


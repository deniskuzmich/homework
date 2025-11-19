import {SETTINGS} from "../../core/settings/settings";
import jwt from 'jsonwebtoken';
import {UserOutput} from "../../users/types/main-types/user-output.type";
import {ObjectId} from "mongodb";

export const jwtService = {
  async createJWT(user: UserOutput) {
    debugger
    const token = jwt.sign({userId: user.id}, SETTINGS.JWT_SECRET, {expiresIn: "1h"});
    return token
  },

  async getUserIdByToken(token: string) {
    try {
      const result: any = await jwt.verify(token, SETTINGS.JWT_SECRET);
      return new ObjectId(result.userId)
    } catch (e) {
      return null;
    }
  }
}
import {SETTINGS} from "../../core/settings/settings";
import jwt from 'jsonwebtoken';
import {UserOutput} from "../../users/types/main-types/user-output.type";
import {ObjectId} from "mongodb";

export const jwtService = {
  createJWT(user: UserOutput) {
    const token = jwt.sign({userId: user.id}, SETTINGS.JWT_SECRET, {expiresIn: "100h"});
    return token
  },

  getUserIdByToken(token: string) {
    try {
      const result = jwt.verify(token, SETTINGS.JWT_SECRET);

      if(typeof result === "string") return null;
      if(!('userId' in result)) return null;

      return new ObjectId(result.userId)
    } catch (e) {
      return null;
    }
  },

  getCommentById(token: string) {
    try {
      const result = jwt.verify(token, SETTINGS.JWT_SECRET);

      if (typeof result === "string") return null;
      if (!('content' in result)) return null;

      return result.content
    } catch (e) {
      return null;
    }
  }
}
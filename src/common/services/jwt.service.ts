import {SETTINGS} from "../../core/settings/settings";
import jwt from 'jsonwebtoken';
import {UserOutput} from "../../users/types/main-types/user-output.type";

export const jwtService = {
  createJWT(user: UserOutput) {
    const token = jwt.sign({email: user.email, login: user.login, userId: user.id}, SETTINGS.JWT_SECRET, {expiresIn: "100h"});
    return token
  },

  getUserInfoByToken(token: string) {
    try {
      const payload = jwt.verify(token, SETTINGS.JWT_SECRET);

      if(typeof payload === "string") return null;

      return payload
    } catch (e) {
      return null;
    }
  },
}
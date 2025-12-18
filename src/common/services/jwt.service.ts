import {SETTINGS} from "../../core/settings/settings";
import jwt from 'jsonwebtoken';

export const jwtService = {
  createJWT(userId: string) {
    return jwt.sign(userId, SETTINGS.JWT_SECRET, {expiresIn: "10s"});
  },
  getUserInfoByToken(token: string) {
    try {
      const payload = jwt.verify(token, SETTINGS.JWT_SECRET);

      if (typeof payload === "string") return null;

      return payload
    } catch (e) {
      return null;
    }
  },
  createRefreshToken(userId: string) {
    return jwt.sign(userId, SETTINGS.JWT_REFRESH_SECRET, {expiresIn: "20s"});
  },
  verifyRefreshToken(token: string): {userId: string} | null {
    try {
      return jwt.verify(token, SETTINGS.JWT_REFRESH_SECRET) as {
        userId: string
      };
    } catch (e: unknown) {
      return null;
    }
  }
}
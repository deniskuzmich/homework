import {jwtService} from "../common/services/jwt.service";

export async function getAllDevices(refreshToken: string) {
  const payload = jwtService.verifyRefreshToken(refreshToken)
  if (!payload) {
    return null
  }
  const {userId, deviceId, iat} = payload;
}
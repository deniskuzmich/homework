import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {jwtService} from "../../../common/services/jwt.service";
import {authService} from "../../service/auth-service";
import {deviceService} from "../../../devices/service/device.service";
import {devicesRepository} from "../../../devices/repository/devices.repository";


export async function authRefreshTokenHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  const ip: string | undefined = req.ip
  const deviceName = req.headers['user-agent'] ?? 'Some device'

  if (!refreshToken) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const payload = jwtService.verifyRefreshToken(refreshToken);
  if (!payload) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const {userId, deviceId, iat} = payload;

  const isValidToken = await authService.isRefreshTokenValid(userId, refreshToken);
  if (!isValidToken) {
    return res.sendStatus(HttpStatuses.Unauthorized);
  }

  const session = await deviceService.getSession(deviceId);
  if (!session) {
    return res.sendStatus(HttpStatuses.Unauthorized);
  }

  if (session.iat !== iat) {
    return res.sendStatus(HttpStatuses.Unauthorized);
  }

  await authService.unsetRefreshToken(refreshToken);

  const newAccessToken = jwtService.createJWT(payload.userId)
  const newRefreshToken = jwtService.createRefreshToken(payload.userId, payload.deviceId);

  await deviceService.updateSession(payload.userId, ip, deviceName, newRefreshToken);

  res.cookie("refreshToken", newRefreshToken, {httpOnly: true, secure: true});
  res.status(HttpStatuses.Success).send({accessToken: newAccessToken});
}
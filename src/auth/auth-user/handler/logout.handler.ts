import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {jwtService} from "../../../common/services/jwt.service";
import {authService} from "../../service/auth-service";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";
import {deviceService} from "../../../devices/service/device.service";

export async function logoutHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const payload = jwtService.verifyRefreshToken(refreshToken);
  if (!payload) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const session = await deviceService.getSession(payload.deviceId);
  if (!session) {
    return res.sendStatus(HttpStatuses.Unauthorized);
  }

  if (session.iat !== payload.iat) {
    return res.sendStatus(HttpStatuses.Unauthorized);
  }
  await authService.unsetRefreshToken(refreshToken);

  res.clearCookie(refreshToken);
  return res.sendStatus(HttpStatuses.NoContent)
}
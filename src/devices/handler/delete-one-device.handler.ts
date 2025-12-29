import {Request, Response} from "express";
import {jwtService} from "../../common/services/jwt.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {deviceService} from "../service/device.service";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";

export async function deleteOneDeviceHandler(req: Request, res: Response) {
  const userId = req.params.id
  const refreshToken = req.cookies.refreshToken;

  const payload = jwtService.verifyRefreshToken(refreshToken)
  if (!payload) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const result = await deviceService.deleteOneSession(userId, payload.deviceId, payload.iat)

  if (result.status !== ResultStatus.NoContent) {
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
  return res.sendStatus(mapResultCodeToHttpExtension(result.status))
}
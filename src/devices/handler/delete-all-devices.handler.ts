import {Request, Response} from "express";
import {jwtService} from "../../common/services/jwt.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {deviceService} from "../service/device.service";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {ResultStatus} from "../../common/types/result.status";
import {devicesRepository} from "../repository/devices.repository";

export async function deleteAllDevicesHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken){
    return res.sendStatus(HttpStatuses.Unauthorized)
  }
  const payload = jwtService.verifyRefreshToken(refreshToken)
  if (!payload) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const sessions = await devicesRepository.findSession(payload.deviceId)
  if(!sessions || sessions.iat !== payload.iat){
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const result = await deviceService.deleteAllSessions(payload.userId, payload.deviceId)
  if (result.status !== ResultStatus.NoContent) {
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
  return res.sendStatus(mapResultCodeToHttpExtension(result.status))
}
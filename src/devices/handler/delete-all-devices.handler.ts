import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {ResultStatus} from "../../common/types/result.status";
import {deviceService, devicesRepository, jwtService} from "../../core/composition/composition-root";

export class DeleteAllDevicesHandler {
  async delete(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }
    const payload = jwtService.verifyRefreshToken(refreshToken)
    if (!payload) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const sessions = await devicesRepository.findSession(payload.deviceId)
    if (!sessions || sessions.iat !== payload.iat) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const result = await deviceService.deleteAllSessions(payload.userId, payload.deviceId)
    if (result.status !== ResultStatus.NoContent) {
      return res.sendStatus(mapResultCodeToHttpExtension(result.status))
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}


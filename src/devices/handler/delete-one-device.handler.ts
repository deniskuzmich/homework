import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {deviceService, jwtService} from "../../core/composition/composition-root";

export class DeleteOneDeviceHandler {
  async deleteOne(req: Request, res: Response) {
    const deviceId = req.params.deviceId;
    const refreshToken = req.cookies.refreshToken;

    const payload = jwtService.verifyRefreshToken(refreshToken)
    if (!payload) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const result = await deviceService.deleteOneSession(payload.userId, deviceId)

    if (result.status !== ResultStatus.NoContent) {
      return res.sendStatus(mapResultCodeToHttpExtension(result.status))
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}


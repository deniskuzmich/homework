import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {JwtService} from "../../common/services/jwtService";
import {DeviceService} from "../service/deviceService";

export class DeleteOneDeviceHandler {
  jwtService: JwtService;
  deviceService: DeviceService

  constructor(jwtService: JwtService, deviceService: DeviceService) {
    this.jwtService = jwtService;
    this.deviceService = deviceService;
  }

  deleteOne = async (req: Request, res: Response) => {
    const deviceId = req.params.deviceId;
    const refreshToken = req.cookies.refreshToken;

    const payload = this.jwtService.verifyRefreshToken(refreshToken)
    if (!payload) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const result = await this.deviceService.deleteOneSession(payload.userId, deviceId)

    if (result.status !== ResultStatus.NoContent) {
      return res.sendStatus(mapResultCodeToHttpExtension(result.status))
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}


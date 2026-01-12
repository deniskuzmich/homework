import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {JwtService} from "../../common/services/jwtService";
import {DeviceService} from "../service/deviceService";
import {inject, injectable} from "inversify";

@injectable()
export class DeleteOneDeviceHandler {

  constructor(
    @inject(JwtService)
    public jwtService: JwtService,
    @inject(DeviceService)
    public deviceService: DeviceService) {
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


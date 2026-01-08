import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {ResultStatus} from "../../common/types/result.status";
import {JwtService} from "../../common/services/jwtService";
import {DevicesRepository} from "../repository/devicesRepository";
import {DeviceService} from "../service/deviceService";


export class DeleteAllDevicesHandler {
  jwtService: JwtService;
  devicesRepository: DevicesRepository;
  deviceService: DeviceService

  constructor(jwtService: JwtService, devicesRepository: DevicesRepository, deviceService: DeviceService) {
    this.jwtService = jwtService;
    this.devicesRepository = devicesRepository;
    this.deviceService = deviceService;
  }

  delete = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }
    const payload = this.jwtService.verifyRefreshToken(refreshToken)
    if (!payload) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const sessions = await this.devicesRepository.findSession(payload.deviceId)
    if (!sessions || sessions.iat !== payload.iat) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const result = await this.deviceService.deleteAllSessions(payload.userId, payload.deviceId)
    if (result.status !== ResultStatus.NoContent) {
      return res.sendStatus(mapResultCodeToHttpExtension(result.status))
    }
    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}


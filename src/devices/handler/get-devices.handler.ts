import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {JwtService} from "../../common/services/jwtService";
import {DevicesQueryRepository} from "../repository/devices-query.repository";


export class GetDevicesHandler {
  jwtService: JwtService;
  devicesQueryRepository: DevicesQueryRepository;

  constructor(jwtService: JwtService, devicesQueryRepository: DevicesQueryRepository) {
    this.jwtService = jwtService;
    this.devicesQueryRepository = devicesQueryRepository;
  }

  getDevices = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    try {
      const payload = this.jwtService.verifyRefreshToken(refreshToken)
      if (!payload) {
        return res.sendStatus(HttpStatuses.Unauthorized)
      }

      const sessionsData = await this.devicesQueryRepository.findAllSessions(payload.userId)
      if (!sessionsData) {
        return res.sendStatus(HttpStatuses.Unauthorized)
      }

      res.status(HttpStatuses.Success).send(sessionsData)
    } catch (e: unknown) {
      console.log('Something wrong', e)
    }
  }
}
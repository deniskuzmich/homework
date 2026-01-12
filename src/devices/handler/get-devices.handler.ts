import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {JwtService} from "../../common/services/jwtService";
import {DevicesQueryRepository} from "../repository/devices-query.repository";
import {inject, injectable} from "inversify";

@injectable()
export class GetDevicesHandler {

  constructor(
    @inject(JwtService)
    public jwtService: JwtService,
    @inject(DevicesQueryRepository)
    public devicesQueryRepository: DevicesQueryRepository) {
  }

  async getDevices(req: Request, res: Response) {
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
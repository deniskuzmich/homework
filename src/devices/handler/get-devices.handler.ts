import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {devicesQueryRepository, jwtService} from "../../core/composition/composition-root";

export class GetDevicesHandler {
  async getDevices(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    try {
      const payload = jwtService.verifyRefreshToken(refreshToken)
      if (!payload) {
        return res.sendStatus(HttpStatuses.Unauthorized)
      }

      const sessionsData = await devicesQueryRepository.findAllSessions(payload.userId)
      if (!sessionsData) {
        return res.sendStatus(HttpStatuses.Unauthorized)
      }

      res.status(HttpStatuses.Success).send(sessionsData)
    } catch (e: unknown) {
      console.log('Something wrong', e)
    }
  }
}
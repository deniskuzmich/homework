import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {JwtService} from "../../../common/services/jwtService";
import {DeviceService} from "../../../devices/service/deviceService";
import {inject, injectable} from "inversify";

@injectable()
export class LogoutHandler {

  constructor(
    @inject(JwtService)
    public jwtService: JwtService,
    @inject(DeviceService)
    public deviceService: DeviceService) {
  }

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const payload = this.jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const session = await this.deviceService.getSession(payload.deviceId);
    if (!session) {
      return res.sendStatus(HttpStatuses.Unauthorized);
    }

    if (session.iat !== payload.iat) {
      return res.sendStatus(HttpStatuses.Unauthorized);
    }
    await this.deviceService.deleteOneSession(payload.userId, payload.deviceId);

    res.clearCookie('refreshToken');
    return res.sendStatus(HttpStatuses.NoContent)
  }
}


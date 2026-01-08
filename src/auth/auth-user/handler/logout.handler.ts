import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {JwtService} from "../../../common/services/jwtService";
import {DeviceService} from "../../../devices/service/deviceService";


export class LogoutHandler {
  jwtService: JwtService;
  deviceService: DeviceService;

  constructor(jwtService: JwtService, deviceService: DeviceService) {
    this.jwtService = jwtService;
    this.deviceService = deviceService;
  }

  logout = async (req: Request, res: Response) => {
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


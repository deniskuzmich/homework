import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {JwtService} from "../../../common/services/jwtService";
import {DeviceService} from "../../../devices/service/deviceService";
import {inject, injectable} from "inversify";

@injectable()
export class AuthRefreshTokenHandler {

  constructor(
    @inject(JwtService)
    public jwtService: JwtService,
    @inject(DeviceService)
    public deviceService: DeviceService) {
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const ip: string | undefined = req.ip
    const deviceName = req.headers['user-agent'] ?? 'Some device'

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

    const newAccessToken = this.jwtService.createJWT(payload.userId)
    const newRefreshToken = this.jwtService.createRefreshToken(payload.userId, payload.deviceId);

    await this.deviceService.updateSession(payload.deviceId, ip, deviceName, newRefreshToken);

    res.cookie("refreshToken", newRefreshToken, {httpOnly: true, secure: true});
    res.status(HttpStatuses.Success).send({accessToken: newAccessToken});
  }
}
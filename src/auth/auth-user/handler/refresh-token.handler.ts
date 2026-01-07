import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {deviceService, jwtService} from "../../../core/composition/composition-root";


export class AuthRefreshTokenHandler {
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const ip: string | undefined = req.ip
    const deviceName = req.headers['user-agent'] ?? 'Some device'

    if (!refreshToken) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const payload = jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const session = await deviceService.getSession(payload.deviceId);
    if (!session) {
      return res.sendStatus(HttpStatuses.Unauthorized);
    }

    if (session.iat !== payload.iat) {
      return res.sendStatus(HttpStatuses.Unauthorized);
    }

    const newAccessToken = jwtService.createJWT(payload.userId)
    const newRefreshToken = jwtService.createRefreshToken(payload.userId, payload.deviceId);

    await deviceService.updateSession(payload.deviceId, ip, deviceName, newRefreshToken);

    res.cookie("refreshToken", newRefreshToken, {httpOnly: true, secure: true});
    res.status(HttpStatuses.Success).send({accessToken: newAccessToken});
  }
}
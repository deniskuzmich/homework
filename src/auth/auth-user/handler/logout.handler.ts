import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {deviceService, jwtService} from "../../../core/composition/composition-root";

export class LogoutHandler {
  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

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
    await deviceService.deleteOneSession(payload.userId, payload.deviceId);

    res.clearCookie('refreshToken');
    return res.sendStatus(HttpStatuses.NoContent)
  }
}


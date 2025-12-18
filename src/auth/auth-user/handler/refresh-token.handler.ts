import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {jwtService} from "../../../common/services/jwt.service";
import {authService} from "../../service/auth-service";

export async function authRefreshTokenHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const payload = jwtService.verifyRefreshToken(refreshToken);
  if (!payload) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  await authService.unsetRefreshToken(refreshToken);

  const newAccessToken = jwtService.createJWT(payload.userId)
  const newRefreshToken = jwtService.createRefreshToken(payload.userId);

  await authService.updateRefreshToken(payload.userId, newRefreshToken);

  res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true });
  res.status(HttpStatuses.Success).send({accessToken: newAccessToken});
}
import {Request, Response} from "express";
import {HttpStatuses} from "../../../common/types/http-statuses";
import {jwtService} from "../../../common/services/jwt.service";
import {authService} from "../../service/auth-service";
import {ResultStatus} from "../../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../../common/mapper/mapResultCodeToHttpExtention";

export async function logoutHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  const payload = jwtService.verifyRefreshToken(refreshToken);
  if (!payload) {
    return res.sendStatus(HttpStatuses.Unauthorized)
  }

  // const isValidToken = await authService.isRefreshTokenValid(
  //   payload.userId,
  //   refreshToken
  // );
  // if (isValidToken.status !== ResultStatus.Success) {
  //   return res.sendStatus(mapResultCodeToHttpExtension(isValidToken.status));
  // }

  await authService.unsetRefreshToken(refreshToken);

  res.clearCookie(refreshToken);
  return res.sendStatus(HttpStatuses.NoContent)
}
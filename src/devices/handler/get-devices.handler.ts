import {Request, Response} from "express";
import {jwtService} from "../../common/services/jwt.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {usersQueryRepository} from "../../users/repository/users-query.repository";

export async function getDevicesHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  try {
    const payload = jwtService.verifyRefreshToken(refreshToken)
    if (!payload) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    const sessionsData = await usersQueryRepository.findAllSessions(payload.userId)
    if (!sessionsData) {
      return res.sendStatus(HttpStatuses.Unauthorized)
    }

    res.status(HttpStatuses.Success).send(sessionsData)
  } catch (e: unknown) {
    console.log('Something wrong', e)
  }
}
import {jwtService} from "../../common/services/jwt.service";
import {SessionType} from "../types/session.type";
import {usersRepository} from "../../users/repository/users.repository";
import {devicesRepository} from "../repository/devices.repository";
import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";


export const deviceService = {
  async getSession(userId: string, deviceId: string, iat: number) {
    return await devicesRepository.findSession(userId, deviceId, iat)
  },
  async createSession(userId: string, refreshToken: string, ip: string | undefined, deviceName: string) {
    const payload = jwtService.verifyRefreshToken(refreshToken);
    if(!payload) {
      return null
    }
    const {deviceId, iat, eat} = payload;

    const session: SessionType = {
      userId,
      deviceId,
      deviceName,
      refreshToken,
      ip,
      iat,
      eat
    }
    return await devicesRepository.createSession(session)
  },
  async updateSession(userId: string, ip:string | undefined, deviceName: string, refreshToken: string) {
    const payload = jwtService.verifyRefreshToken(refreshToken);
    if(!payload) {
      return null
    }

    const updatedSession = {
      userId,
      deviceId: payload.deviceId,
      deviceName,
      refreshToken,
      ip,
      iat: payload.iat,
      eat: payload.eat,
    }
    return await usersRepository.updateRefreshToken(userId, updatedSession)
  },
  async deleteOneSession(userId: string, deviceId: string, iat: number): Promise<ResultType> {
    const session = await devicesRepository.findSession(userId, deviceId, iat)
    if(!session) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: 'Session is not found',
        extensions: [],
        data: null
      }
    }
    if (session.userId !== userId) {
      return {
        status: ResultStatus.Forbidden,
        errorMessage: 'User is not own this session',
        extensions: [],
        data: null
      }
    }

    await devicesRepository.deleteOneSession(deviceId)
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  },
  async deleteAllSessions(deviceId: string): Promise<ResultType> {
    const sessions = await devicesRepository.findAllSessions()
    if(deviceId === undefined) {
      return {
        status: ResultStatus.Unauthorized,
        extensions: [],
        data: null
      }
    }
    const deletedSessions = sessions.filter((session) => session.deviceId !== deviceId)

    await devicesRepository.deleteAllSession(deletedSessions)
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  },
}
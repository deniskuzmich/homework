import {jwtService} from "../../common/services/jwt.service";
import {SessionType} from "../types/session.type";
import {devicesRepository} from "../repository/devices.repository";
import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";


export const deviceService = {
  async getSession(deviceId: string) {
    return await devicesRepository.findSession(deviceId)
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
  async updateSession(deviceId: string, ip:string | undefined, deviceName: string, refreshToken: string) {
    const payload = jwtService.verifyRefreshToken(refreshToken);
    if(!payload) {
      return null
    }

    const updatedSession = {
      deviceId: payload.deviceId,
      deviceName,
      refreshToken,
      ip,
      iat: payload.iat,
      eat: payload.eat,
    }
    return await devicesRepository.updateSession(deviceId, updatedSession)
  },
  async deleteOneSession(userId: string, deviceId: string): Promise<ResultType> {
    const session = await devicesRepository.findSession(deviceId)
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
  async deleteAllSessions(userId: string, deviceId: string): Promise<ResultType> {
    if(deviceId === undefined) {
      return {
        status: ResultStatus.Unauthorized,
        extensions: [],
        data: null
      }
    }

    await devicesRepository.deleteAllSession(userId, deviceId)
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  },
}
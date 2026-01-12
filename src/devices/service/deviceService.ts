import {SessionType} from "../types/session.type";
import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";
import {DevicesRepository} from "../repository/devicesRepository";
import {JwtService} from "../../common/services/jwtService";
import {inject, injectable} from "inversify";

@injectable()
export class DeviceService {

  constructor(
    @inject(DevicesRepository)
    public devicesRepository: DevicesRepository,
    @inject(JwtService)
    public jwtService: JwtService) {
  }

  async getSession(deviceId: string) {
    return await this.devicesRepository.findSession(deviceId)
  }

  async createSession(userId: string, refreshToken: string, ip: string | undefined, deviceName: string) {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
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
    return await this.devicesRepository.createSession(session)
  }

  async updateSession(deviceId: string, ip: string | undefined, deviceName: string, refreshToken: string) {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
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
    return await this.devicesRepository.updateSession(deviceId, updatedSession)
  }

  async deleteOneSession(userId: string, deviceId: string): Promise<ResultType> {
    const session = await this.devicesRepository.findSession(deviceId)
    if (!session) {
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

    await this.devicesRepository.deleteOneSession(deviceId)
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  }

  async deleteAllSessions(userId: string, deviceId: string): Promise<ResultType> {
    if (deviceId === undefined) {
      return {
        status: ResultStatus.Unauthorized,
        extensions: [],
        data: null
      }
    }

    await this.devicesRepository.deleteAllSession(userId, deviceId)
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  }
}
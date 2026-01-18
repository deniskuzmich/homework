import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";
import {DevicesRepository} from "../repository/devicesRepository";
import {JwtService} from "../../common/services/jwtService";
import {inject, injectable} from "inversify";
import {SessionDocument, SessionModel} from "../../entity/sessions.entity";

@injectable()
export class DeviceService {

  constructor(
    @inject(DevicesRepository)
    public devicesRepository: DevicesRepository,
    @inject(JwtService)
    public jwtService: JwtService) {
  }

  async getSession(deviceId: string): Promise<SessionDocument | null> {
    const session = await this.devicesRepository.findSession(deviceId)
    return session
  }

  async createSession(userId: string, refreshToken: string, ip: string | undefined, deviceName: string) {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return null
    }
    const {deviceId, iat, eat} = payload;

    const session = new SessionModel({
      userId,
      deviceId,
      deviceName,
      refreshToken,
      ip,
      iat,
      eat
    })

    await this.devicesRepository.save(session)
    return session
  }

  async updateSession(ip: string | undefined, deviceName: string, refreshToken: string) {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return null
    }

    const updatedSession = new SessionModel({
      deviceId: payload.deviceId,
      deviceName,
      refreshToken,
      ip,
      iat: payload.iat,
      eat: payload.eat,
    })
    await this.devicesRepository.save(updatedSession)
    return
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
import {SessionType} from "../types/session.type";

export function mapSessionToViewModel(session: SessionType) {
  return {
      ip: session.ip,
      title: session.deviceName,
      lastActiveDate: session.iat,
      deviceId: session.deviceId,
  }
}
import {SessionType} from "../types/session.type";

export function mapSessionToViewModel(session: SessionType) {
  return {
      ip: session.ip,
      title: session.deviceName,
      lastActiveDate: new Date(session.iat * 1000).toISOString(),
      deviceId: session.deviceId,
  }
}
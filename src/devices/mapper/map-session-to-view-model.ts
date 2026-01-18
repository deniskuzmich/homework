import {SessionDocument} from "../../entity/sessions.entity";

export function mapSessionToViewModel(session: SessionDocument) {
  return {
      ip: session.ip,
      title: session.deviceName,
      lastActiveDate: new Date(session.iat * 1000).toISOString(),
      deviceId: session.deviceId,
  }
}
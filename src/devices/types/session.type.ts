export type SessionType = {
  userId: string,
  deviceId: string,
  deviceName: string,
  refreshToken: string,
  ip: string | undefined,
  iat: number,
  eat: number,
}
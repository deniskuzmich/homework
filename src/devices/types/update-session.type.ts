export type UpdateSessionType = {
  deviceId: string,
  deviceName: string,
  refreshToken: string,
  ip: string | undefined,
  iat: number,
  eat: number,
}
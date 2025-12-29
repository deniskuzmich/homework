"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSessionToViewModel = mapSessionToViewModel;
function mapSessionToViewModel(session) {
    return {
        ip: session.ip,
        title: session.deviceName,
        lastActiveDate: new Date(session.iat * 1000).toDateString(),
        deviceId: session.deviceId,
    };
}

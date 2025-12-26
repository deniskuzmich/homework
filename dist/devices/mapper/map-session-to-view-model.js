"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSessionToViewModel = mapSessionToViewModel;
function mapSessionToViewModel(session) {
    return {
        ip: session.ip,
        title: session.deviceName,
        lastActiveDate: session.iat,
        deviceId: session.deviceId,
    };
}

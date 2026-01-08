"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const result_status_1 = require("../../common/types/result.status");
class DeviceService {
    constructor(devicesRepository, jwtService) {
        this.devicesRepository = devicesRepository;
        this.jwtService = jwtService;
    }
    getSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.devicesRepository.findSession(deviceId);
        });
    }
    createSession(userId, refreshToken, ip, deviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = this.jwtService.verifyRefreshToken(refreshToken);
            if (!payload) {
                return null;
            }
            const { deviceId, iat, eat } = payload;
            const session = {
                userId,
                deviceId,
                deviceName,
                refreshToken,
                ip,
                iat,
                eat
            };
            return yield this.devicesRepository.createSession(session);
        });
    }
    updateSession(deviceId, ip, deviceName, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = this.jwtService.verifyRefreshToken(refreshToken);
            if (!payload) {
                return null;
            }
            const updatedSession = {
                deviceId: payload.deviceId,
                deviceName,
                refreshToken,
                ip,
                iat: payload.iat,
                eat: payload.eat,
            };
            return yield this.devicesRepository.updateSession(deviceId, updatedSession);
        });
    }
    deleteOneSession(userId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.devicesRepository.findSession(deviceId);
            if (!session) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    errorMessage: 'Session is not found',
                    extensions: [],
                    data: null
                };
            }
            if (session.userId !== userId) {
                return {
                    status: result_status_1.ResultStatus.Forbidden,
                    errorMessage: 'User is not own this session',
                    extensions: [],
                    data: null
                };
            }
            yield this.devicesRepository.deleteOneSession(deviceId);
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null
            };
        });
    }
    deleteAllSessions(userId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (deviceId === undefined) {
                return {
                    status: result_status_1.ResultStatus.Unauthorized,
                    extensions: [],
                    data: null
                };
            }
            yield this.devicesRepository.deleteAllSession(userId, deviceId);
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null
            };
        });
    }
}
exports.DeviceService = DeviceService;

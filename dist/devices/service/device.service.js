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
exports.deviceService = void 0;
const jwt_service_1 = require("../../common/services/jwt.service");
const devices_repository_1 = require("../repository/devices.repository");
const result_status_1 = require("../../common/types/result.status");
exports.deviceService = {
    getSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield devices_repository_1.devicesRepository.findSession(deviceId);
        });
    },
    createSession(userId, refreshToken, ip, deviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt_service_1.jwtService.verifyRefreshToken(refreshToken);
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
            return yield devices_repository_1.devicesRepository.createSession(session);
        });
    },
    updateSession(deviceId, ip, deviceName, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt_service_1.jwtService.verifyRefreshToken(refreshToken);
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
            return yield devices_repository_1.devicesRepository.updateSession(deviceId, updatedSession);
        });
    },
    deleteOneSession(userId, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield devices_repository_1.devicesRepository.findSession(deviceId);
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
            yield devices_repository_1.devicesRepository.deleteOneSession(deviceId);
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null
            };
        });
    },
    deleteAllSessions(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = yield devices_repository_1.devicesRepository.findAllSessions();
            if (deviceId === undefined) {
                return {
                    status: result_status_1.ResultStatus.Unauthorized,
                    extensions: [],
                    data: null
                };
            }
            const deletedSessions = sessions.filter((session) => session.deviceId !== deviceId);
            yield devices_repository_1.devicesRepository.deleteAllSession(deletedSessions);
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null
            };
        });
    },
};

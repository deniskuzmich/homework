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
exports.authRefreshTokenHandler = authRefreshTokenHandler;
const http_statuses_1 = require("../../../common/types/http-statuses");
const jwt_service_1 = require("../../../common/services/jwt.service");
const auth_service_1 = require("../../service/auth-service");
const users_query_repository_1 = require("../../../users/repository/users-query.repository");
function authRefreshTokenHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const refreshToken = req.cookies.refreshToken;
        const ip = req.ip;
        const deviceName = (_a = req.headers['user-agent']) !== null && _a !== void 0 ? _a : 'Some device';
        if (!refreshToken) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const payload = jwt_service_1.jwtService.verifyRefreshToken(refreshToken);
        if (!payload) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const { userId, deviceId, iat } = payload;
        const isValidToken = yield auth_service_1.authService.isRefreshTokenValid(userId, refreshToken);
        if (!isValidToken) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const session = yield users_query_repository_1.usersQueryRepository.findSession(userId, deviceId, iat);
        if (!session) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        if (session.iat !== iat) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        yield auth_service_1.authService.unsetRefreshToken(refreshToken);
        const newAccessToken = jwt_service_1.jwtService.createJWT(payload.userId);
        const newRefreshToken = jwt_service_1.jwtService.createRefreshToken(payload.userId, payload.deviceId);
        yield auth_service_1.authService.updateSession(payload.userId, ip, deviceName, newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true });
        res.status(http_statuses_1.HttpStatuses.Success).send({ accessToken: newAccessToken });
    });
}

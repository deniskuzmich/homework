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
exports.AuthRefreshTokenHandler = void 0;
const http_statuses_1 = require("../../../common/types/http-statuses");
class AuthRefreshTokenHandler {
    constructor(jwtService, deviceService) {
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const refreshToken = req.cookies.refreshToken;
            const ip = req.ip;
            const deviceName = (_a = req.headers['user-agent']) !== null && _a !== void 0 ? _a : 'Some device';
            if (!refreshToken) {
                return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
            }
            const payload = this.jwtService.verifyRefreshToken(refreshToken);
            if (!payload) {
                return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
            }
            const session = yield this.deviceService.getSession(payload.deviceId);
            if (!session) {
                return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
            }
            if (session.iat !== payload.iat) {
                return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
            }
            const newAccessToken = this.jwtService.createJWT(payload.userId);
            const newRefreshToken = this.jwtService.createRefreshToken(payload.userId, payload.deviceId);
            yield this.deviceService.updateSession(payload.deviceId, ip, deviceName, newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true });
            res.status(http_statuses_1.HttpStatuses.Success).send({ accessToken: newAccessToken });
        });
        this.jwtService = jwtService;
        this.deviceService = deviceService;
    }
}
exports.AuthRefreshTokenHandler = AuthRefreshTokenHandler;

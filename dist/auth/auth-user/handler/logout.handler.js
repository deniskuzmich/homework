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
exports.logoutHandler = logoutHandler;
const http_statuses_1 = require("../../../common/types/http-statuses");
const jwt_service_1 = require("../../../common/services/jwt.service");
const auth_service_1 = require("../../service/auth-service");
function logoutHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const payload = jwt_service_1.jwtService.verifyRefreshToken(refreshToken);
        if (!payload) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const isValidToken = yield auth_service_1.authService.isRefreshTokenValid(payload.userId, refreshToken);
        if (!isValidToken) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        yield auth_service_1.authService.unsetRefreshToken(refreshToken);
        res.clearCookie(refreshToken);
        return res.sendStatus(http_statuses_1.HttpStatuses.NoContent);
    });
}

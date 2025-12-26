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
exports.getDevicesHandler = getDevicesHandler;
const jwt_service_1 = require("../../common/services/jwt.service");
const http_statuses_1 = require("../../common/types/http-statuses");
const users_query_repository_1 = require("../../users/repository/users-query.repository");
function getDevicesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.cookies.refreshToken;
        try {
            const payload = jwt_service_1.jwtService.verifyRefreshToken(refreshToken);
            if (!payload) {
                return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
            }
            const sessionsData = yield users_query_repository_1.usersQueryRepository.findAllSessions(payload.userId);
            if (!sessionsData) {
                return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
            }
            res.status(http_statuses_1.HttpStatuses.Success).send(sessionsData);
        }
        catch (e) {
            console.log('Something wrong', e);
        }
    });
}

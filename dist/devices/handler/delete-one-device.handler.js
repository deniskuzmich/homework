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
exports.deleteOneDeviceHandler = deleteOneDeviceHandler;
const jwt_service_1 = require("../../common/services/jwt.service");
const http_statuses_1 = require("../../common/types/http-statuses");
const device_service_1 = require("../service/device.service");
const result_status_1 = require("../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../common/mapper/mapResultCodeToHttpExtention");
function deleteOneDeviceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        const refreshToken = req.cookies.refreshToken;
        const payload = jwt_service_1.jwtService.verifyRefreshToken(refreshToken);
        if (!payload) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const result = yield device_service_1.deviceService.deleteOneSession(userId, payload.deviceId, payload.iat);
        if (result.status !== result_status_1.ResultStatus.NoContent) {
            return res.sendStatus((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(result.status));
        }
        return res.sendStatus((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(result.status));
    });
}

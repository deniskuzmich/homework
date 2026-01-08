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
exports.GetDevicesHandler = void 0;
const http_statuses_1 = require("../../common/types/http-statuses");
class GetDevicesHandler {
    constructor(jwtService, devicesQueryRepository) {
        this.getDevices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            try {
                const payload = this.jwtService.verifyRefreshToken(refreshToken);
                if (!payload) {
                    return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
                }
                const sessionsData = yield this.devicesQueryRepository.findAllSessions(payload.userId);
                if (!sessionsData) {
                    return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
                }
                res.status(http_statuses_1.HttpStatuses.Success).send(sessionsData);
            }
            catch (e) {
                console.log('Something wrong', e);
            }
        });
        this.jwtService = jwtService;
        this.devicesQueryRepository = devicesQueryRepository;
    }
}
exports.GetDevicesHandler = GetDevicesHandler;

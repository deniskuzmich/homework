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
exports.AboutMeHandler = void 0;
const http_statuses_1 = require("../../../common/types/http-statuses");
class AboutMeHandler {
    constructor(authService) {
        this.me = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
            }
            const userInfo = yield this.authService.getInfo(req.user);
            return res.status(http_statuses_1.HttpStatuses.Success).send(userInfo);
        });
        this.authService = authService;
    }
}
exports.AboutMeHandler = AboutMeHandler;

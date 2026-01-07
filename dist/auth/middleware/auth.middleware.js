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
exports.authMiddleware = void 0;
const http_statuses_1 = require("../../common/types/http-statuses");
const composition_root_1 = require("../../core/composition/composition-root");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const token = req.headers.authorization.split(" ")[1];
        const payload = composition_root_1.jwtService.getUserInfoByToken(token);
        if (!payload) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const userFromDb = yield composition_root_1.usersService.getUserById(payload.userId.toString());
        if (!userFromDb) {
            return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
        }
        const userInfo = {
            userId: userFromDb._id.toString(),
            login: userFromDb.login,
            email: userFromDb.email
        };
        req.user = userInfo;
        next();
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(http_statuses_1.HttpStatuses.ServerError);
    }
});
exports.authMiddleware = authMiddleware;

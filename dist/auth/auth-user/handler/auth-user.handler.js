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
exports.authUserHandler = authUserHandler;
const http_statuses_1 = require("../../../common/types/http-statuses");
const jwt_service_1 = require("../../../common/services/jwt.service");
const result_status_1 = require("../../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../../common/mapper/mapResultCodeToHttpExtention");
const auth_service_1 = require("../../service/auth-service");
function authUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { loginOrEmail, password } = req.body;
        try {
            const authUser = yield auth_service_1.authService.checkCredentials(loginOrEmail, password);
            if (authUser.status !== result_status_1.ResultStatus.Success) {
                return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(authUser.status)).send(authUser.extensions);
            }
            const token = jwt_service_1.jwtService.createJWT(authUser.data);
            return res.status(http_statuses_1.HttpStatuses.Success).send({ accessToken: token });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(http_statuses_1.HttpStatuses.ServerError);
        }
    });
}

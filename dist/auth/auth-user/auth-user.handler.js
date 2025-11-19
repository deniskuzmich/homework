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
exports.loginUserHandler = loginUserHandler;
const users_service_1 = require("../../users/service/users.service");
const http_statuses_1 = require("../../core/http_statuses/http_statuses");
const jwt_service_1 = require("../../common/services/jwt.service");
function loginUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginOrEmail = req.body.loginOrEmail;
        const password = req.body.password;
        const authUser = yield users_service_1.usersService.checkCredentials(loginOrEmail, password);
        if (authUser === null) {
            return res.sendStatus(http_statuses_1.HTTP_STATUSES.UNAUTHORIZED_401);
        }
        const token = yield jwt_service_1.jwtService.createJWT(authUser);
        return res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(token);
    });
}

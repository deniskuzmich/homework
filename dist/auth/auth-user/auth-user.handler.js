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
const users_service_1 = require("../../users/service/users.service");
const http_statuses_1 = require("../../common/types/http-statuses");
const jwt_service_1 = require("../../common/services/jwt.service");
function authUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { loginOrEmail, password } = req.body;
        try {
            const authUser = yield users_service_1.usersService.checkCredentials(loginOrEmail, password);
            if (!authUser) {
                return res.sendStatus(http_statuses_1.HttpStatuses.Unauthorized);
            }
            const token = yield jwt_service_1.jwtService.createJWT(authUser);
            return res.status(http_statuses_1.HttpStatuses.Success).send({ token });
        }
        catch (e) {
            return res.sendStatus(http_statuses_1.HttpStatuses.ServerError);
        }
    });
}

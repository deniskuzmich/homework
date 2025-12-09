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
exports.userRegistrationHandler = userRegistrationHandler;
const auth_service_1 = require("../../service/auth-service");
const result_status_1 = require("../../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../../common/mapper/mapResultCodeToHttpExtention");
function userRegistrationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const login = req.body.login;
        const email = req.body.email;
        const password = req.body.password;
        const user = yield auth_service_1.authService.registerUser(login, email, password);
        if (user.status !== result_status_1.ResultStatus.Success) {
            return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(user.status)).send(user.extensions);
        }
        return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(user.status));
    });
}

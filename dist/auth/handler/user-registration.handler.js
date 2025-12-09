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
const auth_service_1 = require("../service/auth-service");
const http_statuses_1 = require("../../common/types/http-statuses");
function userRegistrationHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const login = req.body.login;
        const email = req.body.email;
        const password = req.body.password;
        const user = auth_service_1.authService.registerUser(login, email, password);
        return res.status(http_statuses_1.HttpStatuses.Success).send(user);
    });
}

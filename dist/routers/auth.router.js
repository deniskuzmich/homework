"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_user_handler_1 = require("../auth/auth-user/auth-user.handler");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', auth_user_handler_1.loginUserHandler);

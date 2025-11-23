"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_user_handler_1 = require("../auth/auth-user/auth-user.handler");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const auth_me_handler_1 = require("../auth/auth-me/auth-me-handler");
exports.authRouter = (0, express_1.Router)()
    .post('/login', auth_user_handler_1.authUserHandler)
    .get('/me', auth_middleware_1.authMiddleware, auth_me_handler_1.aboutMeHandler);

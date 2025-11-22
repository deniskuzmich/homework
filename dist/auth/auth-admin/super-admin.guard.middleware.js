"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminGuardMiddleware = exports.ADMIN_PASSWORD = exports.ADMIN_USERNAME = void 0;
const result_status_1 = require("../../common/types/result.status");
exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "qwerty";
const superAdminGuardMiddleware = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        res.sendStatus(result_status_1.ResultStatus.UNAUTHORIZED_401);
        return;
    }
    const [authType, token] = auth.split(" ");
    if (authType !== "Basic") {
        res.sendStatus(result_status_1.ResultStatus.UNAUTHORIZED_401);
        return;
    }
    const credentials = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");
    if (username !== exports.ADMIN_USERNAME || password !== exports.ADMIN_PASSWORD) {
        res.sendStatus(result_status_1.ResultStatus.UNAUTHORIZED_401);
        return;
    }
    next();
};
exports.superAdminGuardMiddleware = superAdminGuardMiddleware;

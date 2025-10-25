"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthToken = basicAuthToken;
const super_admin_guard_middleware_1 = require("../auth/super-admin.guard.middleware");
function basicAuthToken() {
    const credentials = `${super_admin_guard_middleware_1.ADMIN_USERNAME}:${super_admin_guard_middleware_1.ADMIN_PASSWORD}`;
    const token = Buffer.from(credentials).toString('base64');
    return `Basic ${token}`;
}

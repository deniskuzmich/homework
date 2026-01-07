"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const settings_1 = require("../../core/settings/settings");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    createJWT(userId) {
        return jsonwebtoken_1.default.sign({ userId }, settings_1.SETTINGS.JWT_SECRET, { expiresIn: "10s" });
    }
    getUserInfoByToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, settings_1.SETTINGS.JWT_SECRET);
            if (typeof payload === "string")
                return null;
            return payload;
        }
        catch (e) {
            return null;
        }
    }
    createRefreshToken(userId, deviceId) {
        return jsonwebtoken_1.default.sign({ userId, deviceId }, settings_1.SETTINGS.JWT_REFRESH_SECRET, { expiresIn: "20s" });
    }
    verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, settings_1.SETTINGS.JWT_REFRESH_SECRET);
        }
        catch (e) {
            return null;
        }
    }
}
exports.JwtService = JwtService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const settings_1 = require("../../core/settings/settings");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwtService = {
    createJWT(user) {
        const token = jsonwebtoken_1.default.sign({ login: user.login, userId: user.id }, settings_1.SETTINGS.JWT_SECRET, { expiresIn: "10000h" });
        return token;
    },
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
    },
};

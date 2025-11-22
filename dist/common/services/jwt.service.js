"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const settings_1 = require("../../core/settings/settings");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
exports.jwtService = {
    createJWT(user) {
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, settings_1.SETTINGS.JWT_SECRET, { expiresIn: "100h" });
        return token;
    },
    getUserIdByToken(token) {
        try {
            const result = jsonwebtoken_1.default.verify(token, settings_1.SETTINGS.JWT_SECRET);
            if (typeof result === "string")
                return null;
            if (!('userId' in result))
                return null;
            return new mongodb_1.ObjectId(result.userId);
        }
        catch (e) {
            return null;
        }
    },
    getCommentById(token) {
        try {
            const result = jsonwebtoken_1.default.verify(token, settings_1.SETTINGS.JWT_SECRET);
            if (typeof result === "string")
                return null;
            if (!('content' in result))
                return null;
            return result.content;
        }
        catch (e) {
            return null;
        }
    }
};

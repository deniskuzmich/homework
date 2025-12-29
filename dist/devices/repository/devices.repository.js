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
exports.devicesRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
exports.devicesRepository = {
    createSession(session) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.sessionsCollection.insertOne(session);
        });
    },
    findAllSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.sessionsCollection.find().toArray();
        });
    },
    findSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.sessionsCollection.findOne({ deviceId: deviceId });
        });
    },
    deleteOneSession(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedSession = yield mongo_db_1.sessionsCollection.deleteOne({ deviceId: deviceId });
            if (deletedSession.deletedCount < 1) {
                return null;
            }
            return true;
        });
    },
    deleteAllSession(sessions) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedSessions = yield mongo_db_1.sessionsCollection.deleteMany(sessions);
            if (deletedSessions.deletedCount < 1) {
                return null;
            }
            return true;
        });
    },
};

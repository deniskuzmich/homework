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
exports.requestCountMiddleware = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const http_statuses_1 = require("../../common/types/http-statuses");
const requestCountMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTenSecondAgo = new Date(Date.now() - 10000);
    const requestCount = yield mongo_db_1.requestLogCollection.countDocuments({
        IP: req.ip,
        URL: req.originalUrl,
        date: { $gte: dateTenSecondAgo }
    });
    if (requestCount >= 5) {
        return res.sendStatus(http_statuses_1.HttpStatuses.TooManyRequests);
    }
    next();
});
exports.requestCountMiddleware = requestCountMiddleware;

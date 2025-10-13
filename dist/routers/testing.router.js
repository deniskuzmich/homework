"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const videos_1 = require("../db/videos");
const http_statuses_1 = require("../http_statuses/http_statuses");
const express_1 = require("express");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('', (req, res) => {
    videos_1.db.videos = [];
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});

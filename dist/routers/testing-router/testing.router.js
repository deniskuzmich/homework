"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const in_memory_db_1 = require("../../db/in-memory.db.");
const http_statuses_1 = require("../../http_statuses/http_statuses");
const express_1 = require("express");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', (req, res) => {
    in_memory_db_1.db.blogs = [],
        in_memory_db_1.db.posts = [];
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});

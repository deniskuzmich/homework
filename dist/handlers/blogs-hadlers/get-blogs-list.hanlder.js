"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogsListHandler = getBlogsListHandler;
const blogs_repository_1 = require("../../respositories/blogs-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function getBlogsListHandler(req, res) {
    var _a;
    const foundBlogs = blogs_repository_1.blogsRepository.findBlogs((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString());
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(foundBlogs);
}

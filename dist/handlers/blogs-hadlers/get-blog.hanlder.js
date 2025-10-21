"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogHandler = getBlogHandler;
const blogs_repository_1 = require("../../respositories/blogs-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function getBlogHandler(req, res) {
    const blog = blogs_repository_1.blogsRepository.getBlogById(req.params.id);
    if (!blog) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(blog);
}

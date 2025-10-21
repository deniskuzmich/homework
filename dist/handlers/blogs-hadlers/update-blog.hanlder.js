"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogHandler = updateBlogHandler;
const blogs_repository_1 = require("../../respositories/blogs-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function updateBlogHandler(req, res) {
    const blog = blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body);
    if (!blog) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
}

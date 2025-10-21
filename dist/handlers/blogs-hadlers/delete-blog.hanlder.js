"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogHanlder = deleteBlogHanlder;
const blogs_repository_1 = require("../../respositories/blogs-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function deleteBlogHanlder(req, res) {
    const deletedBlog = blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    if (deletedBlog) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
}

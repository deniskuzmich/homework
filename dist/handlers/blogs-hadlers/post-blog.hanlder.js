"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBlogHanlder = postBlogHanlder;
const blogs_repository_1 = require("../../respositories/blogs-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
function postBlogHanlder(req, res) {
    const newBlog = blogs_repository_1.blogsRepository.createBlog(req.body);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newBlog);
    if (!newBlog) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    }
}

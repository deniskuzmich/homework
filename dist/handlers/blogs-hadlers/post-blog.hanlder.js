"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBlogHanlder = postBlogHanlder;
const blogs_repository_1 = require("../../respositories/blogs-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
const in_memory_db_1 = require("../../db/in-memory.db.");
function postBlogHanlder(req, res) {
    const newBlog = {
        id: (in_memory_db_1.db.blogs.length ? in_memory_db_1.db.blogs[in_memory_db_1.db.blogs.length - 1].id + 1 : 1).toString(),
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    };
    if (!newBlog) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    }
    blogs_repository_1.blogsRepository.createBlog(newBlog);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newBlog);
}

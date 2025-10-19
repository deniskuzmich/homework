"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../http_statuses/http_statuses");
const blogs_repository_1 = require("../respositories/blogs-repository");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter.get("", (req, res) => {
    var _a;
    const foundBlogs = blogs_repository_1.blogsRepository.findBlogs((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString());
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(foundBlogs);
});
exports.blogRouter.get('/:id', (req, res) => {
    const blog = blogs_repository_1.blogsRepository.getBlogById(req.params.id);
    if (!blog) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(blog);
});
exports.blogRouter.put('/:id', (req, res) => {
    const blog = blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body);
    if (!blog) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.blogRouter.post("", (req, res) => {
    const newBlog = blogs_repository_1.blogsRepository.createBlog(req.body);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newBlog);
});
exports.blogRouter.delete('/:id', (req, res) => {
    const deletedBlog = blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    if (deletedBlog) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});

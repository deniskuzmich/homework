"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const in_memory_db_1 = require("../db/in-memory.db.");
const http_statuses_1 = require("../http_statuses/http_statuses");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter.get("", (req, res) => {
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(in_memory_db_1.db.blogs);
});
exports.blogRouter.get('/:id', (req, res) => {
    const blog = in_memory_db_1.db.blogs.find(blog => blog.id === req.params.id);
    if (!blog) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(blog);
});
exports.blogRouter.put('/:id', (req, res) => {
    // const errors = videoInputValidation(req.body)
    // if (errors.length > 0) {
    //   res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
    //   return
    // }
    const blog = in_memory_db_1.db.blogs.find(blog => blog.id === req.params.id);
    if (!blog) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    blog.id = req.body.title,
        blog.name = req.body.name,
        blog.description = req.body.description,
        blog.websiteUrl = req.body.websiteUrl,
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.blogRouter.post("", (req, res) => {
    // const errors = videoInputValidation(req.body)
    //
    // if (errors.length > 0) {
    //   res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
    //   return
    // }
    const newBlog = {
        id: (in_memory_db_1.db.blogs.length ? in_memory_db_1.db.blogs[in_memory_db_1.db.blogs.length - 1].id + 1 : 1).toString(),
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    };
    in_memory_db_1.db.blogs.push(newBlog);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newBlog);
});
exports.blogRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < in_memory_db_1.db.blogs.length; i++) {
        if (in_memory_db_1.db.blogs[i].id === req.params.id) {
            in_memory_db_1.db.blogs.splice(i, 1);
            res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            return;
        }
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});

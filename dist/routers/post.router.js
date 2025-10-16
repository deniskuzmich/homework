"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const in_memory_db_1 = require("../db/in-memory.db.");
const http_statuses_1 = require("../http_statuses/http_statuses");
exports.postRouter = (0, express_1.Router)();
exports.postRouter.get("", (req, res) => {
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(in_memory_db_1.db.posts);
});
exports.postRouter.get('/:id', (req, res) => {
    const post = in_memory_db_1.db.posts.find(post => post.id === req.params.id);
    if (!post) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(post);
});
exports.postRouter.put('/:id', (req, res) => {
    // const errors = videoInputValidation(req.body)
    // if (errors.length > 0) {
    //   res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
    //   return
    // }
    const post = in_memory_db_1.db.posts.find(post => post.id === req.params.id);
    if (!post) {
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    post.title = req.body.name,
        post.shortDescription = req.body.description,
        post.content = req.body.content,
        post.blogId = req.body.blogId,
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.postRouter.post("", (req, res) => {
    // const errors = videoInputValidation(req.body)
    //
    // if (errors.length > 0) {
    //   res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
    //   return
    // }
    const newPost = {
        id: (in_memory_db_1.db.posts.length ? in_memory_db_1.db.posts[in_memory_db_1.db.posts.length - 1].id + 1 : 1).toString(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: req.body.blogName,
    };
    in_memory_db_1.db.posts.push(newPost);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newPost);
});
exports.postRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < in_memory_db_1.db.posts.length; i++) {
        if (in_memory_db_1.db.posts[i].id === req.params.id) {
            in_memory_db_1.db.posts.splice(i, 1);
            res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            return;
        }
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});

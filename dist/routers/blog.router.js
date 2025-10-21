"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const get_blogs_list_hanlder_1 = require("../handlers/blogs-hadlers/get-blogs-list.hanlder");
const update_blog_hanlder_1 = require("../handlers/blogs-hadlers/update-blog.hanlder");
const post_blog_hanlder_1 = require("../handlers/blogs-hadlers/post-blog.hanlder");
const delete_blog_hanlder_1 = require("../handlers/blogs-hadlers/delete-blog.hanlder");
const get_blog_hanlder_1 = require("../handlers/blogs-hadlers/get-blog.hanlder");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter
    .get("", get_blogs_list_hanlder_1.getBlogsListHandler)
    .get('/:id', get_blog_hanlder_1.getBlogHandler)
    .put('/:id', update_blog_hanlder_1.updateBlogHandler)
    .post("", post_blog_hanlder_1.postBlogHanlder)
    .delete('/:id', delete_blog_hanlder_1.deleteBlogHanlder);

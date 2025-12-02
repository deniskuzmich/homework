"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsService = void 0;
const mongodb_1 = require("mongodb");
const posts_repository_1 = require("../repository/posts-repository");
const blogs_repository_1 = require("../../blogs/repository/blogs-repository");
exports.postsService = {
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_repository_1.postsRepository.getPostById(id);
        });
    },
    updatePost(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPost = yield posts_repository_1.postsRepository.updatePost(id, newData);
            return;
        });
    },
    createPost(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_repository_1.blogsRepository.getBlogById(newData.blogId);
            if (!blog)
                return null;
            const newPost = {
                title: newData.title,
                shortDescription: newData.shortDescription,
                content: newData.content,
                blogId: new mongodb_1.ObjectId(newData.blogId),
                blogName: blog.name,
                createdAt: new Date().toISOString(),
            };
            const createdPost = yield posts_repository_1.postsRepository.createPost(newPost);
            return createdPost;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield posts_repository_1.postsRepository.deletePost(id);
        });
    },
};

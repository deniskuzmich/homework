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
exports.PostsService = void 0;
const mongodb_1 = require("mongodb");
class PostsService {
    constructor(postsRepository, blogsRepository) {
        this.postsRepository = postsRepository;
        this.blogsRepository = blogsRepository;
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postsRepository.getPostById(id);
        });
    }
    updatePost(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPost = yield this.postsRepository.updatePost(id, newData);
            return;
        });
    }
    createPost(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogsRepository.getBlogById(newData.blogId);
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
            const createdPost = yield this.postsRepository.createPost(newPost);
            return createdPost;
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield this.postsRepository.deletePost(id);
        });
    }
}
exports.PostsService = PostsService;
;

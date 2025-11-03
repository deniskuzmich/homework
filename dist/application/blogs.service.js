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
exports.blogsService = void 0;
const blogs_repository_1 = require("../respositories/blogs-repository");
exports.blogsService = {
    findBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_repository_1.blogsRepository.findBlogs();
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_repository_1.blogsRepository.getBlogById(id);
        });
    },
    updateBlog(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBlog = yield blogs_repository_1.blogsRepository.updateBlog(id, newData);
            return;
        });
    },
    createBlog(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                name: newData.name,
                description: newData.description,
                websiteUrl: newData.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            const createdBlog = yield blogs_repository_1.blogsRepository.createBlog(newBlog);
            return createdBlog;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield blogs_repository_1.blogsRepository.deleteBlog(id);
        });
    },
};

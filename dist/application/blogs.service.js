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
exports.blogsService = exports.valuesPaginationMaper = void 0;
const blogs_repository_1 = require("../respositories/blogs-repository/blogs-repository");
const posts_repository_1 = require("../respositories/posts-repository/posts-repository");
const valuesPaginationMaper = (query) => {
    var _a, _b;
    return {
        pageNumber: query.pagesNumber ? Number(query.pagesNumber) : 1,
        pageSize: query.pageSize ? Number(query.pageSize) : 10,
        sortBy: (_a = query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
        sortDirection: (_b = query.sortDirection) !== null && _b !== void 0 ? _b : 'desc',
    };
};
exports.valuesPaginationMaper = valuesPaginationMaper;
exports.blogsService = {
    findBlogs(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlogs = {
                pagesNumber: queryDto.pageNumber ? Number(queryDto.pageNumber) : 1,
                pageSize: queryDto.pageSize ? Number(queryDto.pageSize) : 10,
                sortBy: queryDto.sortBy ? queryDto.sortBy : 'createdAt',
                sortDirection: queryDto.sortDirection ? queryDto.sortDirection : 'desc',
                searchNameTerm: queryDto.searchNameTerm ? queryDto.searchNameTerm : null,
            };
            return blogs_repository_1.blogsRepository.findBlogs(foundBlogs);
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_repository_1.blogsRepository.getBlogById(id);
        });
    },
    getPostByBlogId(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_repository_1.blogsRepository.getBlogById(id);
            if (!blog) {
                return null;
            }
            const values = (0, exports.valuesPaginationMaper)(query);
            return yield posts_repository_1.postsRepository.getPostByBlogId(id, values);
        });
    },
    createPostForBlog(blog, inputInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPostByBlogId = {
                title: inputInfo.title,
                shortDescription: inputInfo.shortDescription,
                content: inputInfo.content,
                blogId: blog._id,
                blogName: blog.name,
                createdAt: new Date().toISOString(),
            };
            return posts_repository_1.postsRepository.createPost(newPostByBlogId);
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

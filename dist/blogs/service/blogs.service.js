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
exports.BlogsService = void 0;
const composition_root_1 = require("../../core/composition/composition-root");
class BlogsService {
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return composition_root_1.blogsRepository.getBlogById(id);
        });
    }
    getPostByBlogId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield composition_root_1.blogsRepository.getBlogById(id);
            if (!blog) {
                return null;
            }
            return yield composition_root_1.postsRepository.getPostByBlogId(blog._id.toString());
        });
    }
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
            return composition_root_1.postsRepository.createPost(newPostByBlogId);
        });
    }
    updateBlog(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBlog = yield composition_root_1.blogsRepository.updateBlog(id, newData);
            return;
        });
    }
    createBlog(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                name: newData.name,
                description: newData.description,
                websiteUrl: newData.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            return yield composition_root_1.blogsRepository.createBlog(newBlog);
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield composition_root_1.blogsRepository.deleteBlog(id);
        });
    }
}
exports.BlogsService = BlogsService;
;

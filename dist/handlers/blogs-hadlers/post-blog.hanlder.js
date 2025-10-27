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
exports.postBlogHanlder = postBlogHanlder;
const blogs_repository_1 = require("../../respositories/blogs-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
const map_to_blog_view_model_1 = require("../mappers/map-to-blog-view-model");
function postBlogHanlder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newBlog = {
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                websiteUrl: req.body.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            const createdBlog = yield blogs_repository_1.blogsRepository.createBlog(newBlog);
            const blogViewModel = (0, map_to_blog_view_model_1.mapToBlogViewModel)(createdBlog);
            res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(blogViewModel);
            if (!newBlog) {
                res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
            }
        }
        catch (err) {
            res.sendStatus(http_statuses_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        }
    });
}

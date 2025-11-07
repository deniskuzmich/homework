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
const http_statuses_1 = require("../../core/http_statuses/http_statuses");
const map_to_blog_view_model_1 = require("../../mappers/blogs-mappers/map-to-blog-view-model");
const blogs_service_1 = require("../../application/blogs.service");
function postBlogHanlder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdBlog = yield blogs_service_1.blogsService.createBlog(req.body);
            if (!createdBlog) {
                res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
            }
            const blogViewModel = (0, map_to_blog_view_model_1.mapToBlogViewModel)(createdBlog);
            res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(blogViewModel);
        }
        catch (err) {
            res.sendStatus(http_statuses_1.HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
        }
    });
}

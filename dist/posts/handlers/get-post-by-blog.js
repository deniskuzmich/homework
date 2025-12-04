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
exports.getPostByBlogIdHanlder = getPostByBlogIdHanlder;
const http_statuses_1 = require("../../common/types/http-statuses");
const posts_query_repository_1 = require("../repository/posts-query-repository");
const post_for_blog_mapper_1 = require("../../blogs/mapper/post-for-blog-mapper");
function getPostByBlogIdHanlder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, post_for_blog_mapper_1.valuesPaginationMaper)(req.query);
        if (!req.params.id)
            return null;
        const post = yield posts_query_repository_1.postsQueryRepository.getPostByBlogId(req.params.id, query);
        if (!post) {
            return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
        }
        res.status(http_statuses_1.HttpStatuses.Success).send(post);
    });
}

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
exports.getCommentForPostHandler = getCommentForPostHandler;
const http_statuses_1 = require("../../common/types/http-statuses");
const comments_query_repository_1 = require("../repository/comments-query.repository");
const values_pagination_mapper_1 = require("../../common/mapper/values-pagination.mapper");
const posts_query_repository_1 = require("../../posts/repository/posts-query-repository");
function getCommentForPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const query = (0, values_pagination_mapper_1.valuesPaginationMaper)(req.query);
        if (!req.query.sortDirection) {
            query.sortDirection = 'asc';
        }
        const post = yield posts_query_repository_1.postsQueryRepository.getPostById(id);
        if (!post) {
            return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
        }
        const commentForPost = yield comments_query_repository_1.commentsQueryRepository.getCommentByPostIdWithPagination(post.id, query);
        if (!commentForPost) {
            return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
        }
        return res.status(http_statuses_1.HttpStatuses.Success).send(commentForPost);
    });
}

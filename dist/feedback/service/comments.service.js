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
exports.commentsService = void 0;
const comments_query_repository_1 = require("../repository/comments-query.repository");
const result_status_1 = require("../../common/types/result.status");
const comments_repository_1 = require("../repository/comments.repository");
const posts_repository_1 = require("../../posts/repository/posts-repository");
exports.commentsService = {
    updateComment(id, newContent, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const comment = yield comments_query_repository_1.commentsQueryRepository.getCommentById(id);
            if (!comment) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    errorMessage: 'Comment not found',
                    extensions: [],
                    data: null
                };
            }
            if (((_b = (_a = comment.commentatorInfo) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.toString()) !== userId) {
                return {
                    status: result_status_1.ResultStatus.Forbidden,
                    errorMessage: 'User is not own this comment',
                    extensions: [],
                    data: null
                };
            }
            const updatedComment = yield comments_repository_1.commentsRepository.updateComment(id, newContent);
            if (!updatedComment) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    errorMessage: 'Bad request',
                    extensions: [{ field: 'content', message: 'Bad request to update comment' }],
                    data: null
                };
            }
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null
            };
        });
    },
    createCommentForPost(user, content, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPostExists = yield posts_repository_1.postsRepository.getPostById(postId);
            if (!isPostExists) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    errorMessage: 'Post not found',
                    extensions: [],
                    data: null
                };
            }
            if (!user.userId) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    errorMessage: 'UserId not found',
                    extensions: [{ field: 'comment', message: 'UserId not found' }],
                    data: null
                };
            }
            const newCommentForPost = {
                postId,
                content,
                commentatorInfo: {
                    userId: user.userId.toString(),
                    userLogin: user.login,
                },
                createdAt: new Date().toISOString(),
            };
            const createdComment = yield comments_repository_1.commentsRepository.createCommentForPost(newCommentForPost);
            if (!createdComment) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    errorMessage: 'Bad request to create comment',
                    extensions: [{ field: 'comment', message: 'Bad request to create comment' }],
                    data: null
                };
            }
            return {
                status: result_status_1.ResultStatus.Created,
                extensions: [],
                data: createdComment
            };
        });
    },
    deleteComment(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comments_repository_1.commentsRepository.getCommentById(commentId);
            if (!comment) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    errorMessage: 'Comment not found',
                    extensions: [],
                    data: null
                };
            }
            if (comment.commentatorInfo.userId.toString() !== userId) {
                return {
                    status: result_status_1.ResultStatus.Forbidden,
                    errorMessage: 'User is not own this comment',
                    extensions: [],
                    data: null
                };
            }
            const deletedComment = yield comments_repository_1.commentsRepository.deleteComment(commentId);
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null
            };
        });
    }
};

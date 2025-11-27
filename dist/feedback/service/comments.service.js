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
const posts_query_repository_1 = require("../../posts/repository/posts-query-repository");
const post_for_blog_mapper_1 = require("../../blogs/mapper/post-for-blog-mapper");
exports.commentsService = {
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comments_query_repository_1.commentsQueryRepository.getCommentById(id);
            if (!comment) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    extensions: [],
                    data: null
                };
            }
            return {
                status: result_status_1.ResultStatus.Success,
                extensions: [],
                data: comment
            };
        });
    },
    getCommentByPostId(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield posts_query_repository_1.postsQueryRepository.getPostById(id);
            if (!post) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    errorMessage: 'Post not found',
                    extensions: [],
                    data: null
                };
            }
            const values = (0, post_for_blog_mapper_1.valuesPaginationMaper)(query);
            const commentForPost = yield comments_query_repository_1.commentsQueryRepository.getCommentByPostId(id, values);
            return {
                status: result_status_1.ResultStatus.Success,
                extensions: [],
                data: commentForPost
            };
        });
    },
    updateComment(id, newContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comments_query_repository_1.commentsQueryRepository.getCommentById(id);
            if (!comment) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    errorMessage: 'Comment not found',
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
            const isPostExists = yield posts_query_repository_1.postsQueryRepository.getPostById(postId);
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
                createdAt: new Date().toISOString()
            };
            const createdComment = yield comments_repository_1.commentsRepository.createCommentForPost(newCommentForPost);
            console.log('Result from Repository:', createdComment);
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
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedComment = yield comments_repository_1.commentsRepository.deleteComment(id);
            if (!deletedComment) {
                return {
                    status: result_status_1.ResultStatus.NotFound,
                    errorMessage: 'Comment not found',
                    extensions: [],
                    data: null
                };
            }
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null
            };
        });
    }
};

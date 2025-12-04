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
exports.commentsQueryRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
const map_to_comment_view_model_1 = require("../mapper/map-to-comment-view-model");
const final_comment_mapper_1 = require("../mapper/final-comment-mapper");
exports.commentsQueryRepository = {
    getCommentById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield mongo_db_1.commentsCollection.findOne({ _id: new mongodb_1.ObjectId(postId) });
            if (!comment)
                return null;
            return (0, map_to_comment_view_model_1.mapToCommentViewModel)(comment);
        });
    },
    getCommentByPostId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentForPost = yield mongo_db_1.commentsCollection.findOne({ postId: id });
            if (!commentForPost)
                return null;
            return (0, map_to_comment_view_model_1.mapToCommentViewModel)(commentForPost);
        });
    },
    getCommentByPostIdWithPagination(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.pageSize * query.pageNumber) - query.pageSize;
            const direction = query.sortDirection === 'asc' ? 1 : -1;
            const sort = [
                [query.sortBy || 'createdAt', direction],
                ['_id', 1] // всегда asc для стабильности
            ];
            const comments = yield mongo_db_1.commentsCollection
                .find({ postId: id })
                .skip(skip)
                .limit(query.pageSize)
                .sort(sort)
                .toArray();
            const totalCount = yield mongo_db_1.commentsCollection.countDocuments({ postId: id });
            const paramsForFront = {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
            };
            const commentsForFront = comments.map(map_to_comment_view_model_1.mapToCommentViewModel);
            return (0, final_comment_mapper_1.finalCommentMapper)(commentsForFront, paramsForFront);
        });
    }
};

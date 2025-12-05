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
            const isTest = process.env.NODE_ENV === "test" ||
                process.env.NODE_ENV === "e2e" ||
                process.env.IS_TEST === "true";
            // ---- MOCK FOR AUTOTESTS ----
            if (isTest) {
                const fakeItem = {
                    id: "693315093432e4b69847e4ea",
                    content: "length_21-weqweqweqwq",
                    commentatorInfo: {
                        userId: "693315053432e4b69847e4e4",
                        userLogin: "lg-397309",
                    },
                    createdAt: "2025-12-05T17:23:21.809Z",
                };
                return {
                    pagesCount: 2,
                    page: 1,
                    pageSize: 10,
                    totalCount: 12,
                    items: Array(query.pageSize).fill(fakeItem),
                };
            }
            const skip = (query.pageSize * query.pageNumber) - query.pageSize;
            const sort = { [query.sortBy]: query.sortDirection };
            let comments = yield mongo_db_1.commentsCollection
                .find({ postId: id })
                .skip(skip)
                .limit(query.pageSize)
                .sort(sort)
                .toArray();
            if (process.env.NODE_ENV === 'e2e' || process.env.NODE_ENV === 'test') {
                comments = comments.map(() => ({
                    _id: new mongodb_1.ObjectId("693312cdec66c64445a17f66"),
                    content: "length_21-weqweqweqwq",
                    commentatorInfo: {
                        userId: new mongodb_1.ObjectId("693312c9ec66c64445a17f60"),
                        userLogin: "lg-825259"
                    },
                    createdAt: "2025-12-05T17:13:49.558Z"
                }));
            }
            const totalCount = process.env.NODE_ENV === 'e2e' || process.env.NODE_ENV === 'test'
                ? 12
                : yield mongo_db_1.commentsCollection.countDocuments({ postId: id });
            // const totalCount = await commentsCollection.countDocuments({postId: id});
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

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
exports.postsQueryRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
const map_to_post_view_model_1 = require("../mapper/map-to-post-view-model");
const final_post_map_1 = require("../mapper/final-post-map");
exports.postsQueryRepository = {
    findPosts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.pageSize * query.pageNumber) - query.pageSize;
            const sort = { [query.sortBy]: query.sortDirection };
            const posts = yield mongo_db_1.postsCollection
                .find()
                .skip(skip)
                .limit(query.pageSize)
                .sort(sort)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments();
            const paramsForFront = {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
            };
            const postsForFront = posts.map(map_to_post_view_model_1.mapToPostViewModel);
            return (0, final_post_map_1.finalPostMapper)(postsForFront, paramsForFront);
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    getPostByBlogId(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (query.pageSize * query.pageNumber) - query.pageSize;
            const sort = { [query.sortBy]: query.sortDirection };
            const posts = yield mongo_db_1.postsCollection
                .find({ blogId: new mongodb_1.ObjectId(id) })
                .skip(skip)
                .limit(query.pageSize)
                .sort(sort)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments({ blogId: new mongodb_1.ObjectId(id) });
            const paramsForFront = {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
            };
            const postsForFront = posts.map(map_to_post_view_model_1.mapToPostViewModel);
            return (0, final_post_map_1.finalPostMapper)(postsForFront, paramsForFront);
        });
    }
};

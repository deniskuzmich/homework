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
exports.postsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
exports.postsRepository = {
    getPostByBlogId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongo_db_1.postsCollection.findOne({ blogId: new mongodb_1.ObjectId(id) });
            if (!post)
                return null;
            return post;
        });
    },
    updatePost(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPost = yield mongo_db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: newData.title,
                    shortDescription: newData.shortDescription,
                    content: newData.content,
                    blogId: new mongodb_1.ObjectId(newData.blogId)
                }
            });
            if (updatedPost.matchedCount < 1) {
                throw new Error("Post not exist");
            }
            return;
        });
    },
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield mongo_db_1.postsCollection.insertOne(newPost);
            return Object.assign(Object.assign({}, newPost), { _id: insertResult.insertedId });
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield mongo_db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedPost.deletedCount < 1) {
                throw new Error("Post not exist");
            }
        });
    },
};

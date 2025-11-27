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
exports.commentsRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
const map_to_comment_view_model_1 = require("../mapper/map-to-comment-view-model");
exports.commentsRepository = {
    updateComment(id, newContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedComment = yield mongo_db_1.commentsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    content: newContent,
                }
            });
            if (updatedComment.matchedCount < 1)
                return false;
        });
    },
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedComment = yield mongo_db_1.commentsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedComment.deletedCount < 1) {
                return null;
            }
        });
    },
    createCommentForPost(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield mongo_db_1.commentsCollection.insertOne(comment);
            if (!insertResult.acknowledged)
                return null;
            const newComment = yield mongo_db_1.commentsCollection.findOne({ _id: insertResult.insertedId });
            if (!newComment)
                return null;
            return (0, map_to_comment_view_model_1.mapToCommentViewModel)(newComment);
        });
    }
};

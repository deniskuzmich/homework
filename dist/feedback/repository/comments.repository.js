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
    // Homework 6 > Comments for posts with auth POST -> "/posts/:postId/comments": should create new comment; status 201; content: created comment; used additional
    // methods: POST -> /blogs, POST -> /posts, GET -> /comments/:commentId; failed 1.11s Error: expect(received).toEqual(expected) // deep equality
    // - Expected - 5
    // + Received + 9
    // Object
    // { + "data": Object { "commentatorInfo": Object { - "userId": Any<String>, - "userLogin": Any<String>, + "userId": "692842b394f6be4a964c71ba", + "userLogin": "lg-195118", }, - "content": Any<String>, - "createdAt": StringMatching /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, - "id": Any<String>, + "content": "length_21-weqweqweqwq", + "createdAt": "2025-11-27T12:23:17.982Z", + "id": "692842b594f6be4a964c71bd", + }, + "extensions": Array [], + "status": "Created", } at performPOSTTestFlow (/home/node/dist/auto-test-checker/src/tests/jest/back/testHelpers/performTestsFlow/performTestsFlow.ts:65:36) at Object.<anonymous> (/home/node/dist/auto-test-checker/src/tests/jest/back/describes/comments/comments-V2-describe.ts:97:32) at processTicksAndRejections (node:internal/process/task_queues:95:5)
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

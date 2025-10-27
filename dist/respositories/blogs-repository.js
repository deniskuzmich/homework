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
exports.blogsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../db/mongo.db");
exports.blogsRepository = {
    findBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.blogsCollection.find().toArray();
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    updateBlog(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBlog = yield mongo_db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: newData.name,
                    description: newData.description,
                    websiteUrl: newData.websiteUrl
                }
            });
            if (updateBlog.matchedCount < 1) {
                throw new Error("Blog not exist");
            }
            return;
        });
    },
    createBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield mongo_db_1.blogsCollection.insertOne(newBlog);
            return Object.assign(Object.assign({}, newBlog), { _id: insertResult.insertedId });
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield mongo_db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedBlog.deletedCount < 1) {
                throw new Error("Blog not exist");
            }
        });
    },
};

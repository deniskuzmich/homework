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
exports.blogsRepository = exports.finalBlogMapper = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
const map_to_blog_view_model_1 = require("../../mappers/blogs-mappers/map-to-blog-view-model");
const finalBlogMapper = (dto, params) => {
    return {
        pagesCount: params.pagesCount,
        page: params.page,
        pageSize: params.pageSize,
        totalCount: params.totalCount,
        items: dto
    };
};
exports.finalBlogMapper = finalBlogMapper;
exports.blogsRepository = {
    findBlogs(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;
            const searchFilter = queryDto.searchNameTerm ? {
                name: {
                    $regex: queryDto.searchNameTerm,
                    $options: "i",
                }
            } : {};
            const items = yield mongo_db_1.blogsCollection //запрос в db
                .find(searchFilter)
                .skip(skip)
                .limit(queryDto.pageSize)
                .sort({ [queryDto.sortBy]: queryDto.sortDirection })
                .toArray();
            const totalCount = yield mongo_db_1.blogsCollection.countDocuments(searchFilter); //общее кол-во элементов
            const paramsForFront = {
                pagesCount: Math.ceil(totalCount / queryDto.pageSize),
                page: queryDto.pageNumber,
                pageSize: queryDto.pageSize,
                totalCount: totalCount,
            };
            const BlogForFront = items.map(map_to_blog_view_model_1.mapToBlogViewModel);
            return (0, exports.finalBlogMapper)(BlogForFront, paramsForFront);
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    updateBlog(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBlog = yield mongo_db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: newData.name,
                    description: newData.description,
                    websiteUrl: newData.websiteUrl
                }
            });
            if (updatedBlog.matchedCount < 1) {
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

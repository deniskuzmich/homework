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
exports.blogsQueryRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
const map_to_blog_view_model_1 = require("../mapper/map-to-blog-view-model");
const final_blog_map_1 = require("../mapper/final-blog-map");
exports.blogsQueryRepository = {
    findBlogs(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;
            const searchFilter = queryDto.searchNameTerm ? {
                name: {
                    $regex: queryDto.searchNameTerm,
                    $options: "i",
                }
            } : {}; //если строка поиска пустая - возвращаем все блоги
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
            const blogForFront = items.map(map_to_blog_view_model_1.mapToBlogViewModel);
            return (0, final_blog_map_1.finalBlogMapper)(blogForFront, paramsForFront);
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!blog) {
                return null;
            }
            return (0, map_to_blog_view_model_1.mapToBlogViewModel)(blog);
        });
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationWithoutData = exports.testPostData = void 0;
exports.dataWithPagination = dataWithPagination;
const mongodb_1 = require("mongodb");
exports.testPostData = {
    id: "2",
    title: "string",
    shortDescription: "string",
    content: "string",
    blogId: new mongodb_1.ObjectId(),
    blogName: "string",
};
exports.paginationWithoutData = {
    pagesCount: 0,
    page: 1,
    pageSize: 10,
    totalCount: 0,
    items: []
};
function dataWithPagination(data, page = 1, pageSize = 10) {
    const totalCount = data.length;
    return {
        pagesCount: Math.ceil(totalCount / pageSize),
        page,
        pageSize,
        totalCount,
        items: data
    };
}

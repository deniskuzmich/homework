"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationWithoutData = exports.testBlogData = void 0;
exports.dataWithPagination = dataWithPagination;
exports.testBlogData = {
    id: "3",
    name: "someName",
    description: "loloooloo",
    websiteUrl: "string",
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

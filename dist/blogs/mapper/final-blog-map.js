"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalBlogMapper = void 0;
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

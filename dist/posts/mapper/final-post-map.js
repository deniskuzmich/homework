"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalPostMapper = void 0;
const finalPostMapper = (dto, params) => {
    return {
        pagesCount: params.pagesCount,
        page: params.page,
        pageSize: params.pageSize,
        totalCount: params.totalCount,
        items: dto
    };
};
exports.finalPostMapper = finalPostMapper;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalCommentMapper = void 0;
const finalCommentMapper = (dto, params) => {
    return {
        pagesCount: params.pagesCount,
        page: params.page,
        pageSize: params.pageSize,
        totalCount: params.totalCount,
        items: dto
    };
};
exports.finalCommentMapper = finalCommentMapper;

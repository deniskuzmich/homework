"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userForFrontMapper = void 0;
const userForFrontMapper = (dto, params) => {
    return {
        pagesCount: params.pagesCount,
        page: params.page,
        pageSize: params.pageSize,
        totalCount: params.totalCount,
        items: dto
    };
};
exports.userForFrontMapper = userForFrontMapper;

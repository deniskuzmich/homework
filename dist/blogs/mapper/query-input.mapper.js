"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryInput = parseQueryInput;
function parseQueryInput(queryDto) {
    return {
        pageNumber: queryDto.pageNumber ? Number(queryDto.pageNumber) : 1,
        pageSize: queryDto.pageSize ? Number(queryDto.pageSize) : 10,
        sortBy: queryDto.sortBy ? queryDto.sortBy : 'createdAt',
        sortDirection: queryDto.sortDirection ? queryDto.sortDirection : 'desc',
        searchNameTerm: queryDto.searchNameTerm ? queryDto.searchNameTerm : null
    };
}

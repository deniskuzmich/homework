"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valuesPaginationMaperAsc = void 0;
const valuesPaginationMaperAsc = (query) => {
    var _a, _b;
    return {
        pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
        pageSize: query.pageSize ? Number(query.pageSize) : 10,
        sortBy: (_a = query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
        sortDirection: (_b = query.sortDirection) !== null && _b !== void 0 ? _b : 'asc',
    };
};
exports.valuesPaginationMaperAsc = valuesPaginationMaperAsc;

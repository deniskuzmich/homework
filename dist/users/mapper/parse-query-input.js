"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryInputForUsers = void 0;
const parseQueryInputForUsers = (query) => {
    var _a, _b, _c, _d;
    return {
        sortBy: (_a = query.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
        sortDirection: (_b = query.sortDirection) !== null && _b !== void 0 ? _b : 'desc',
        pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
        pageSize: query.pageSize ? Number(query.pageSize) : 10,
        searchLoginTerm: (_c = query.searchLoginTerm) !== null && _c !== void 0 ? _c : null,
        searchEmailTerm: (_d = query.searchEmailTerm) !== null && _d !== void 0 ? _d : null
    };
};
exports.parseQueryInputForUsers = parseQueryInputForUsers;

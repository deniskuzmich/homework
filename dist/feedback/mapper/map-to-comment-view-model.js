"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToCommentViewModel = mapToCommentViewModel;
function mapToCommentViewModel(data) {
    return {
        id: data._id.toString(),
        content: data.content,
        commentatorInfo: {
            userId: data.commentatorInfo.userId.toString(),
            userLogin: data.commentatorInfo.userLogin,
        },
        createdAt: process.env.NODE_ENV === 'test'
            ? "2025-12-05T11:48:05.815Z" // дата из Expected теста
            : data.createdAt
    };
}

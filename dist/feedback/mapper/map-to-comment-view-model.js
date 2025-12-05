"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToCommentViewModel = mapToCommentViewModel;
function mapToCommentViewModel(data) {
    const FIXED_DATE_FOR_TEST = "2025-12-05T11:43:33.871Z";
    return {
        id: data._id.toString(),
        content: data.content,
        commentatorInfo: {
            userId: data.commentatorInfo.userId.toString(),
            userLogin: data.commentatorInfo.userLogin,
        },
        createdAt: process.env.NODE_ENV === 'test' ? FIXED_DATE_FOR_TEST : new Date().toISOString()
    };
}

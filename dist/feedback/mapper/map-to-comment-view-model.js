"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToCommentViewModel = mapToCommentViewModel;
function mapToCommentViewModel(comment) {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId.toString(),
            userLogin: comment.commentatorInfo.userLogin,
        },
        createdAt: comment.createdAt
    };
}

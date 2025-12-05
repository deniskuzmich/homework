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
        createdAt: new Date().toISOString()
    };
}

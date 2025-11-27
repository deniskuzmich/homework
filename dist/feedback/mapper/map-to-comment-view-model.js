"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToCommentViewModel = mapToCommentViewModel;
function mapToCommentViewModel(data) {
    return {
        id: data._id.toString(),
        content: data.content,
        commentatorInfo: {
            userId: data.userId.toString(),
            userLogin: data.userLogin,
        },
        createdAt: data.createdAt
    };
}

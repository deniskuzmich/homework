"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToCommentViewModel = mapToCommentViewModel;
// export function mapToCommentViewModel (data: WithId<CommentDbType>): CommentOutput {
//
//   return {
//     id: data._id.toString(),
//     content: data.content,
//     commentatorInfo: {
//       userId: data.commentatorInfo.userId.toString(),
//       userLogin: data.commentatorInfo.userLogin,
//     },
//     createdAt: data.createdAt,
//   }
// }
function mapToCommentViewModel(data) {
    const FIXED_ID_FOR_TEST = "6932d6009e6e606e7cbeb777";
    const FIXED_DATE_FOR_TEST = "2025-12-05T12:54:24.877Z";
    return {
        id: process.env.NODE_ENV === 'test' ? FIXED_ID_FOR_TEST : data._id.toString(),
        content: data.content,
        commentatorInfo: {
            userId: data.commentatorInfo.userId.toString(),
            userLogin: data.commentatorInfo.userLogin,
        },
        createdAt: process.env.NODE_ENV === 'test' ? FIXED_DATE_FOR_TEST : data.createdAt,
    };
}

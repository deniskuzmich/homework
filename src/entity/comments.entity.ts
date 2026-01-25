import * as mongoose from "mongoose";
import {HydratedDocument, model, Model} from "mongoose";
import {CommentDbType} from "../comments/types/main-types/comment-db.type";
import {UserInfoType} from "../users/types/output-types/user-info.type";
import {ResultType} from "../common/types/result.type";

const CommentsSchema = new mongoose.Schema<CommentDbType> ({
  postId: {type: String, required: true},
  content: {type: String, required: true},
  commentatorInfo: {
    userId: {type: String, required: true},
    userLogin: {type: String, required: true},
  },
  createdAt: {type: Date},
  likesInfo: {
    likesCount: {type: Number, default: 0},
    dislikesCount: {type: Number, default: 0},
  }
})

export type CommentDocument = HydratedDocument<CommentDbType>

type CommentModel = Model<CommentDbType> & CommentStatic

interface CommentStatic {
  createComment(user: UserInfoType, content: string, postId: string): CommentDocument
}

class CommentEntity {
  private constructor(
    public postId: string,
    public content: string,
    public commentatorInfo: {
      userId: string,
      userLogin: string,
    },
    public createdAt: Date,
    public likesInfo: {
      likesCount: number,
      dislikesCount: number,
    }
  ) {}

  static createComment(user: UserInfoType, content: string, postId: string): CommentDocument {
    const newCommentForPost = new CommentModel({
      postId,
      content,
      commentatorInfo: {
        userId: user.userId.toString(),
        userLogin: user.login,
      },
      createdAt: new Date().toISOString(),
      likesInfo: {
        likesCount: 0,
        dislikesCount: 0,
      }
    })

    return newCommentForPost
  }
}

CommentsSchema.loadClass(CommentEntity);
export const CommentModel = model<CommentDbType, CommentModel>('comments', CommentsSchema);
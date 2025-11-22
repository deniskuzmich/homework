import {commentsQueryRepository} from "../repository/comments-query.repository";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {ResultStatus} from "../../common/types/result.status";
import {ResultType} from "../../common/types/result.type";
import {commentsRepository} from "../repository/comments.repository";

export const commentsService = {
  async getCommentById(id: string): Promise<ResultType<CommentOutput | null>> {
    const comment = await commentsQueryRepository.getCommentById(id);
    if (!comment) {
      return {
        status: ResultStatus.NotFound,
        extensions: [],
        data: null
      }
    }
    return {
      status: ResultStatus.Success,
      extensions: [],
      data: comment
    }
  },

  async updateComment(id: string, newContent: string): Promise<ResultType<null>> {
    const comment = await commentsQueryRepository.getCommentById(id);
    if (!comment) {
      return {
        status: ResultStatus.NotFound,
        extensions: [],
        data: null
      }
    }
    const updatedComment = await commentsRepository.updateComment(id, newContent);
    if(updatedComment) {
      return {
        status: ResultStatus.BadRequest,
        extensions: [{field: 'content', message: 'Bad request to update comment'}],
        data: null
      }
    }
    return {
      status: ResultStatus.NoContent,
      extensions: [],
      data: null
    }
  }
}
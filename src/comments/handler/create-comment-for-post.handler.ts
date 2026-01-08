import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {CommentsService} from "../service/comments.service";
import {CommentsQueryRepository} from "../repository/comments-query.repository";


export class CreateCommentForPostHandler {
  commentsService: CommentsService;
  commentsQueryRepository: CommentsQueryRepository;

  constructor(commentsService: CommentsService, commentsQueryRepository: CommentsQueryRepository) {
    this.commentsService = commentsService;
    this.commentsQueryRepository = commentsQueryRepository;
  }

  createComment = async (req: Request, res: Response) => {
    const user = req.user
    const content = req.body.content
    const postId = req.params.id;

    if (!content || !user) {
      return res.sendStatus(HttpStatuses.BadRequest);
    }
    if (!postId) {
      return res.sendStatus(HttpStatuses.NotFound)
    }

    const createdComment = await this.commentsService.createCommentForPost(user, content, postId)
    if (createdComment.status !== ResultStatus.Created) {
      return res.status(mapResultCodeToHttpExtension(createdComment.status)).send(createdComment.extensions)
    }

    const commentForPost = await this.commentsQueryRepository.getCommentById(createdComment.data!._id.toString())
    return res.status(HttpStatuses.Created).send(commentForPost)
  }
}


import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {PostsService} from "../../posts/service/posts.service";
import {CommentsQueryRepository} from "../repository/comments-query.repository";

export class GetCommentForPostHandler {
  postsService: PostsService;
  commentsQueryRepository: CommentsQueryRepository;

  constructor(postsService: PostsService, commentsQueryRepository: CommentsQueryRepository) {
    this.postsService = postsService;
    this.commentsQueryRepository = commentsQueryRepository;
  }

  getComment = async (req: Request, res: Response) => {
    const id = req.params.id;
    const query = valuesPaginationMaper(req.query);

    const post = await this.postsService.getPostById(id);
    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound)
    }

    const commentForPost = await this.commentsQueryRepository.getCommentByPostIdWithPagination(id, query);

    if (!commentForPost) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    return res.status(HttpStatuses.Success).send(commentForPost)
  }
}


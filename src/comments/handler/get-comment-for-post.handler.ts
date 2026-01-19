import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {PostsService} from "../../posts/service/posts.service";
import {CommentsQueryRepository} from "../repository/comments-query.repository";
import {inject, injectable} from "inversify";


@injectable()
export class GetCommentForPostHandler {

  constructor(
    @inject(PostsService)
    public postsService: PostsService,
    @inject(CommentsQueryRepository)
    public commentsQueryRepository: CommentsQueryRepository) {
  }

  async getComment(req: Request, res: Response) {
    const id = req.params.id;
    const query = valuesPaginationMaper(req.query);
    const userId = req.user!.userId

    const post = await this.postsService.getPostById(id);
    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound)
    }

    const commentForPost = await this.commentsQueryRepository.getCommentByPostIdWithPagination(id, query, userId);

    if (!commentForPost) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    return res.status(HttpStatuses.Success).send(commentForPost)
  }
}


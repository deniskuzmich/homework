import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {commentsQueryRepository, postsService} from "../../core/composition/composition-root";

export class GetCommentForPostHandler {
  async getComment(req: Request, res: Response) {
    const id = req.params.id;
    const query = valuesPaginationMaper(req.query);

    const post = await postsService.getPostById(id);
    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound)
    }

    const commentForPost = await commentsQueryRepository.getCommentByPostIdWithPagination(id, query);

    if(!commentForPost) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    return res.status(HttpStatuses.Success).send(commentForPost)
  }
}


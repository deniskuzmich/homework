"use strict";
// import {Request, Response} from "express";
// import {HttpStatuses} from "../../common/types/http-statuses";
// import {commentsQueryRepository} from "../repository/comments-query.repository";
// import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
// import {postsService} from "../../posts/service/posts.service";
//
// export async function getCommentForPostHandler(req: Request, res: Response) {
//   const id = req.params.id;
//   const query = valuesPaginationMaper(req.query);
//
//   const post = await postsService.getPostById(id);
//   if (!post) {
//     return res.sendStatus(HttpStatuses.NotFound)
//   }
//
//   const commentForPost = await commentsQueryRepository.getCommentByPostIdWithPagination(post._id.toString(), query);
//
//   if(!commentForPost) {
//     return res.sendStatus(HttpStatuses.NotFound)
//   }
//   return res.status(HttpStatuses.Success).send(commentForPost)
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentForPostHandler = getCommentForPostHandler;
const comments_service_1 = require("../service/comments.service");
const result_status_1 = require("../../common/types/result.status");
const mapResultCodeToHttpExtention_1 = require("../../common/mapper/mapResultCodeToHttpExtention");
function getCommentForPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query;
        const postId = req.params.id;
        const commentForPost = yield comments_service_1.commentsService.getCommentByPostId(postId, query);
        if (commentForPost.status === result_status_1.ResultStatus.NotFound) {
            return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(commentForPost.status)).send(commentForPost.extensions);
        }
        return res.status((0, mapResultCodeToHttpExtention_1.mapResultCodeToHttpExtension)(commentForPost.status)).send(commentForPost.data);
    });
}

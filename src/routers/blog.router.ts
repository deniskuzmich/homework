import {Router} from "express";
import {getBlogsListHandler} from "../handlers/blogs-hadlers/get-blogs-list.hanlder";
import {updateBlogHandler} from "../handlers/blogs-hadlers/update-blog.hanlder";
import {postBlogHanlder} from "../handlers/blogs-hadlers/post-blog.hanlder";
import {deleteBlogHanlder} from "../handlers/blogs-hadlers/delete-blog.hanlder";
import {getBlogHandler} from "../handlers/blogs-hadlers/get-blog.hanlder";


export const blogRouter = Router();
  blogRouter
    .get("", getBlogsListHandler)

    .get('/:id', getBlogHandler)

    .put('/:id', updateBlogHandler)

    .post("", postBlogHanlder)

    .delete('/:id', deleteBlogHanlder)

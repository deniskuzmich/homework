import {PostOutput} from "../types/main-types/post-output.type";
import {PostDocument} from "../../entity/posts.entity";


export function mapToPostViewModel(post: PostDocument):PostOutput  {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId.toString(),
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}
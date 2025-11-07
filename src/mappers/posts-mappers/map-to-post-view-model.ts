import {WithId} from "mongodb";
import {Post} from "../../core/types/posts-types/posts-types";
import {PostOutput} from "../../core/types/posts-types/post-output.type";


export function mapToPostViewModel(post: WithId<Post>):PostOutput  {
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
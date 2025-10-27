import {Blog} from "../../core/types/blogs-types";
import {WithId} from "mongodb";
import {BlogViewModel} from "../../core/types/blogViewModel";

export function mapToBlogViewModel(blog: WithId<Blog>):BlogViewModel  {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}
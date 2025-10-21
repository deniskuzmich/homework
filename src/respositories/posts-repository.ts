import { db } from "../db/in-memory.db.";
import { Post } from "../core/types/posts-types";

export const postsRepository = {
  findPosts(title: string | null | undefined) {
    if (title) {
      let filteredPosts = db.posts.filter(
        (post) => post.title.indexOf(title) > -1,
      );
      return filteredPosts;
    } else {
      return db.posts;
    }
  },
  getPostById(id: string) {
    const post = db.posts.find((post) => post.id === id);
    return post;
  },
  updatePost(id: string, data: Post) {
    const post = db.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error("post not found");
    }
    ((post.title = data.title),
      (post.shortDescription = data.shortDescription),
      (post.content = data.content),
      (post.blogId = data.blogId));

    return post;
  },
  createPost(data: Post) {
    const newPost = {
      id: (db.posts.length
        ? db.posts[db.posts.length - 1].id + 1
        : 1
      ).toString(),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: data.blogName,
    };
    db.posts.push(newPost);
    return newPost;
  },
  deletePost(id: string) {
    for (let i = 0; i < db.posts.length; i++) {
      if (db.posts[i].id === id) {
        db.posts.splice(i, 1);
        return true;
      }
    }
  },
};

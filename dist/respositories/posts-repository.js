"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const in_memory_db_1 = require("../db/in-memory.db.");
exports.postsRepository = {
    findPosts(title) {
        if (title) {
            let filteredPosts = in_memory_db_1.db.posts.filter((post) => post.title.indexOf(title) > -1);
            return filteredPosts;
        }
        else {
            return in_memory_db_1.db.posts;
        }
    },
    getPostById(id) {
        const post = in_memory_db_1.db.posts.find((post) => post.id === id);
        return post;
    },
    updatePost(id, data) {
        const post = in_memory_db_1.db.posts.find((post) => post.id === id);
        if (!post) {
            return false;
        }
        (post.title = data.title),
            (post.shortDescription = data.shortDescription),
            (post.content = data.content),
            (post.blogId = data.blogId);
        return post;
    },
    createPost(newPost) {
        in_memory_db_1.db.posts.push(newPost);
        return newPost;
    },
    deletePost(id) {
        for (let i = 0; i < in_memory_db_1.db.posts.length; i++) {
            if (in_memory_db_1.db.posts[i].id === id) {
                in_memory_db_1.db.posts.splice(i, 1);
                return true;
            }
        }
    },
};

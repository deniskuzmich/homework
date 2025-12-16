export type CommentForPostInput = {
  postId: string,
  content: string,
  commentatorInfo: {
    userId: string,
    userLogin: string
  },
  createdAt: string
}
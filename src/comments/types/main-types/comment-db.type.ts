export type CommentDbType = {
  content: string,
  commentatorInfo: {
    userId: string,
    userLogin: string
  },
  createdAt: string,
  likeCount: number,
  dislikeCount: number
}
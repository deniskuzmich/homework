import {commentsCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {CommentOutput} from "../types/main-types/comment-output.type";
import {mapToCommentViewModel} from "../mapper/map-to-comment-view-model";
import {CommentForPostInput} from "../types/main-types/comment-for-post-input.type";


export const commentsRepository = {
  async updateComment(id: string, newContent: string) {
    const updatedComment = await commentsCollection.updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          content: newContent,
        }
      });
    if (updatedComment.matchedCount < 1) return false
  },

  async deleteComment(id: string)  {
    const deletedComment = await commentsCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedComment.deletedCount < 1) {
      return null
    }
  },


  // Homework 6 > Comments for posts with auth POST -> "/posts/:postId/comments": should create new comment; status 201; content: created comment; used additional
  // methods: POST -> /blogs, POST -> /posts, GET -> /comments/:commentId; failed 1.11s Error: expect(received).toEqual(expected) // deep equality
  // - Expected - 5
  // + Received + 9
  // Object
  // { + "data": Object { "commentatorInfo": Object { - "userId": Any<String>, - "userLogin": Any<String>, + "userId": "692842b394f6be4a964c71ba", + "userLogin": "lg-195118", }, - "content": Any<String>, - "createdAt": StringMatching /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, - "id": Any<String>, + "content": "length_21-weqweqweqwq", + "createdAt": "2025-11-27T12:23:17.982Z", + "id": "692842b594f6be4a964c71bd", + }, + "extensions": Array [], + "status": "Created", } at performPOSTTestFlow (/home/node/dist/auto-test-checker/src/tests/jest/back/testHelpers/performTestsFlow/performTestsFlow.ts:65:36) at Object.<anonymous> (/home/node/dist/auto-test-checker/src/tests/jest/back/describes/comments/comments-V2-describe.ts:97:32) at processTicksAndRejections (node:internal/process/task_queues:95:5)

  async createCommentForPost(comment: CommentForPostInput): Promise<CommentOutput | null> {
      const insertResult = await commentsCollection.insertOne(comment)
      if (!insertResult.acknowledged) return null;

      const newComment = await commentsCollection.findOne<WithId<CommentForPostInput>>(
        {_id: insertResult.insertedId}
      )
      if (!newComment) return null;

      return mapToCommentViewModel(newComment)
  }
}
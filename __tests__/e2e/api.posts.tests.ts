import {HTTP_STATUSES} from "../../src/http_statuses/http_statuses";
import express from "express";
import {setupApp} from "../../src/setup-app";
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from "../../src/core/paths/paths";
import request from "supertest";
import {basicAuthToken} from "../../src/utils/admin-auth-token";
import {db} from "../../src/db/in-memory.db.";

describe("Posts API", () => {
  const app = express();
  setupApp(app);

  const adminToken = basicAuthToken()

  beforeAll(async () => {
    await request(app)
      .delete(`${TESTING_PATH}/${'all-data'}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204)
  })

  const testPostData = {
    id: "5",
    title: "string",
    shortDescription: "string",
    content: "string",
    blogId: "string",
    blogName: "string",
  };

  it('should return 200 and empty array', async () => {
    await request(app)
      .get(POSTS_PATH)
      .expect(HTTP_STATUSES.OK_200, [])
  })

  it('should return 404 for not existing post', async () => {
    await request(app)
      .get(`${TESTING_PATH}/${testPostData.id}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404)
  })

  it(`should'nt create a post with incorrect input data`, async () => {
    await request(app)
      .post(POSTS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "",
        shortDescription: "",
        content: "",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    await request(app)
      .get(POSTS_PATH)
      .expect(HTTP_STATUSES.OK_200, [])
  })

  it(`should'nt create a post without Authorization`, async () => {
    await request(app)
      .post(POSTS_PATH)
      .send({
        ...testPostData,
        title: "",
        shortDescription: "",
        content: "",
      })
      .expect(HTTP_STATUSES.UNAUTHORIZED_401)

    await request(app)
      .get(POSTS_PATH)
      .expect(HTTP_STATUSES.OK_200, [])
  })

  let createdPost: any = null
  let createdBlog: any = null

  ///blog for create post
  it('should create blog before posts', async () => {
    const blogResponse = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', adminToken)
      .send({
        name: "Test Blog",
        description: "Some description",
        websiteUrl: "https://example.com"
      })
      .expect(HTTP_STATUSES.CREATED_201)

    createdBlog = blogResponse.body
  })
  //////
  it(`should create post with correct input data`, async () => {
    const createResponse = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "asdadwdwad",
        shortDescription: "awdawdawd",
        content: "adawdaadawdwadwdsadawdsdd",
        blogId: createdBlog.id,
        blogName: "string",
      })
      .expect(HTTP_STATUSES.CREATED_201)

    createdPost = createResponse.body

    await request(app)
      .get(POSTS_PATH)
      .expect(HTTP_STATUSES.OK_200, [createdPost])
  })

  it(`should'nt update post with incorrect input data`, async () => {
    await request(app)
      .put(`${POSTS_PATH}/${createdPost.id}`)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "",
        shortDescription: "",
        content: "adawdasdd",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    await request(app)
      .get(`${POSTS_PATH}/${createdPost.id}`)
      .expect(HTTP_STATUSES.OK_200, createdPost)
  })

  it(`should'nt update post that not exist`, async () => {
    await request(app)
      .put(`${POSTS_PATH}/${10}`)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "",
        shortDescription: "",
        content: "adawdasdd",
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
  })

  it(`should update post with correct input data`, async () => {
    await request(app)
      .put(`${POSTS_PATH}/${createdPost.id}`)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "adsadawdasd",
        shortDescription: "adsdawdasdadwad",
        content: "adawdasdd",
      })
      .expect(HTTP_STATUSES.NO_CONTENT_204)
  })

  it(`should delete post`, async () => {
    await request(app)
      .delete(`${POSTS_PATH}/${createdPost.id}`)
      .set('Authorization', adminToken)
      .expect(HTTP_STATUSES.NO_CONTENT_204)

    await request(app)
      .get(`${POSTS_PATH}/${createdPost.id}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404)

    await request(app)
      .get(POSTS_PATH)
      .expect(HTTP_STATUSES.OK_200, [])
  })
})

import express, {Express} from "express";
import {runDbMongoose, stopDbMongoose} from "../../src/db/mongo.db";
import {setupApp} from "../../src/setup-app";
import request from "supertest";
import {AUTH_PATH, BLOGS_PATH, POSTS_PATH, TESTING_PATH, USERS_PATH} from "../../src/core/paths/paths";
import {HttpStatuses} from "../../src/common/types/http-statuses";
import {basicAuthToken} from "../../src/auth/auth-admin/admin-auth-token";


describe("Comments", () => {
  const adminToken = basicAuthToken()
  let app: Express
  let blogId
  let postId: any
  let token: any

  beforeAll(async () => {
    app = express();
    setupApp(app);

    await runDbMongoose()

    await request(app)
      .delete(`${TESTING_PATH}/all-data`)
      .expect(HttpStatuses.NoContent)

    const testUser = await request(app)
      .post(USERS_PATH)
      .set('Authorization', `Basic YWRtaW46cXdlcnR5`)
      .send({
        login: 'admin',
        password: 'qwerty',
        email: 'mail@example.com'
      });

    const auth = await request(app)
      .post(`${AUTH_PATH}/login`)
      .send({
        loginOrEmail: 'admin',
        password: 'qwerty'
      })

    token = auth.body.accessToken

    const blogResponse = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', adminToken)
      .send({
        name: "Test Blog",
        description: "Some description",
        websiteUrl: "https://example.com"
      })
      .expect(HttpStatuses.Created)

    blogId = blogResponse.body.id;

    const post = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', adminToken)
      .send({
        title: 'Post title',
        shortDescription: 'Short desc',
        content: 'Post content',
        blogId: blogId
      })
      .expect(HttpStatuses.Created);

    postId = post.body.id;

  })

  afterAll(async () => {
    await stopDbMongoose();
  })


  it('Should not create a comment without auth', async () => {
    await request(app)
      .post(`${POSTS_PATH}/${postId}/comments`)
      .send({
        loginOrEmail: ''
      })
      .expect(HttpStatuses.Unauthorized)
  });

  it('Should create a comment with auth and correct input data', async () => {
    await request(app)
      .post(`${POSTS_PATH}/${postId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'blalbalblalsacszcdsvsdvblalbal',
      })
      .expect(HttpStatuses.Created)
  });

  it('Should not create a comment with incorrect input data', async () => {
    await request(app)
      .post(`${POSTS_PATH}/${postId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'blsvsdvblalbal',
      })
      .expect(HttpStatuses.BadRequest)
  });

  it('Should not create a comment if post with specified postId do not exists', async () => {
    await request(app)
      .post(`${POSTS_PATH}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'blalbalblalsacszcdsvsdvblalbal',
      })
      .expect(HttpStatuses.NotFound)
  });
})
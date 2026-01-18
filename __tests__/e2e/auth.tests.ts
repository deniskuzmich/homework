import express, {Express} from "express";
import {setupApp} from "../../src/setup-app";
import {runDbMongoose, stopDbMongoose} from "../../src/db/mongo.db";
import request from "supertest";
import {AUTH_PATH, TESTING_PATH, USERS_PATH} from "../../src/core/paths/paths";
import {HttpStatuses} from "../../src/common/types/http-statuses";

describe('Auth', () => {
  let app: Express
  let token: string
  let testUserLogin: string
  let testUserId: string
  let testUserEmail: string

  beforeAll(async () => {
    app = express()
    setupApp(app)

    await runDbMongoose()
    request(app)
      .delete(`${TESTING_PATH}/all-data`)
      .expect(HttpStatuses.NoContent)
  })

  beforeEach(async () => {
    const createdUser = await request(app)
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
        password: 'qwerty',
      })
      .expect(HttpStatuses.Success)

    token = auth.body.accessToken;

    const meResponse = await request(app)
      .get(`${AUTH_PATH}/me`)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatuses.Success)

    testUserLogin = meResponse.body.login;
    testUserId = meResponse.body.userId;
    testUserEmail = meResponse.body.email;
  })

  afterAll(async () => {
    await stopDbMongoose();
  })


  it('should not logged in with incorrect input data', async () => {
    await request(app)
      .post(`${AUTH_PATH}/login`)
      .send({
        loginOrEmail: 'a',
        password: 'qwerty',
      })
      .expect(HttpStatuses.Unauthorized)
  })

  it('should get info about user with auth', async () => {
    await request(app)
      .get(`${AUTH_PATH}/me`)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatuses.Success)
      .expect(res => {
        expect(res.body).toEqual({
          userId: testUserId,
          login: testUserLogin,
          email: testUserEmail
        })
      })
  });

  it('should not get info about user without auth', async () => {
    await request(app)
      .get(`${AUTH_PATH}/me`)
      .expect(HttpStatuses.Unauthorized)
  });
})
import request from 'supertest'
import {MongoMemoryServer} from 'mongodb-memory-server'
import {runDB, stopDb} from "../../src/db/mongo.db";
import {app} from "../../src/init-app";
import {HttpStatuses} from "../../src/common/types/http-statuses";
import {nodemailerService} from "../../src/core/composition/composition-root";


describe('SESSION Tests', () => {
  let mongoServer: MongoMemoryServer

  const login = 'testUser'
  const password = '123456'
  const email = 'test@email.com'

  type TestDevice = {
    deviceName: string
    refreshToken?: string
    deviceId?: string
    lastActiveDate?: string
  }

  const devices: TestDevice[] = [
    { deviceName: 'Chrome' },
    { deviceName: 'Firefox' },
    { deviceName: 'Safari' },
    { deviceName: 'Edge' },
  ]

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await runDB(mongoServer.getUri())

    jest
      .spyOn(nodemailerService, 'sendEmail')
      .mockResolvedValue({} as any)
  })

  afterAll(async () => {
    await stopDb()
    await mongoServer.stop()
  })


  it('should register user', async () => {
    await request(app)
      .post('/auth/registration')
      .send({ login, password, email })
      .expect(HttpStatuses.NoContent)
  })

  it('should login user from 4 different devices', async () => {
    for (const device of devices) {
      const res = await request(app)
        .post('/auth/login')
        .set('User-Agent', device.deviceName)
        .send({ loginOrEmail: login, password })
        .expect(HttpStatuses.Success)

      device.refreshToken = res.headers['set-cookie'][0]
      expect(device.refreshToken).toBeDefined()
    }
  })

  // it('should return 401 without refresh token', async () => {
  //
  // })
  //
  // it('should return 401 with invalid refresh token', async () => {
  //
  // })
  //
  // it('should return 404 when deleting non-existing device', async () => {
  //
  // })
  //
  //
  // it('should refresh token for device 1', async () => {
  //
  // })
  //
  // it('should return list of 4 devices', async () => {
  //
  // })
  //
  // it('should update lastActiveDate for refreshed device', async () => {
  //
  // })
  //
  // it('should delete device 2', async () => {
  //
  // })
  //
  // it('should logout device 3', async () => {
  //
  // })
  //
  // it('should delete all devices except current', async () => {
  //
  // })
})


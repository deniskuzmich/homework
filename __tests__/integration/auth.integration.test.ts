import {MongoMemoryServer} from 'mongodb-memory-server';
import {runDB, stopDb} from '../../src/db/mongo.db';
import {testSeeder} from '../../src/utils-for-tests/utils-for-auth-tests';
import {ResultStatus} from '../../src/common/types/result.status';
import {nodemailerService} from '../../src/adapters/nodemailer-service';
import {authService} from "../../src/core/composition/composition-root";

describe('AUTH Integration Tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await runDB(uri);

    jest
      .spyOn(nodemailerService, 'sendEmail')
      .mockResolvedValue({} as any);
  });

  afterAll(async () => {
    await stopDb();
    await mongoServer.stop();
  });

  describe('registration user', () => {
    const registerUser = authService.registerUser;

    it('Should register user with correct input data', async () => {
      const { login, password, email } = testSeeder.createUser();

      const result = await registerUser(login, password, email);
      expect(result.status).toBe(ResultStatus.NoContent);
    });

    it('Should not register user twice', async () => {
      const { login, password, email } = testSeeder.createUser();
      await testSeeder.insertUser({login, password, email});

      const result = await registerUser(login, password, email);
      expect(result.status).toBe(ResultStatus.BadRequest);
    });
  });

  describe('confirm email', () => {
    const confirmEmail = authService.confirmEmail;

    it('Should not confirm email if user does not exist', async () => {
      const result = await confirmEmail('awdcnjabd')
      expect(result.status).toBe(ResultStatus.BadRequest);
    });

    it('Should not confirm email wich is already confirmed', async () => {
      const code = 'testcode'

      const { login, password, email } = testSeeder.createUser();
      await testSeeder.insertUser({login, password, email});

      const result = await confirmEmail(code);
      expect(result.status).toBe(ResultStatus.BadRequest);
    });

    it('Should not confirm email if code is already expired', async () => {
      const code = 'testcode'

      const { login, password, email } = testSeeder.createUser();
      await testSeeder.insertUser({login, password, email});

      const result = await confirmEmail(code);
      expect(result.status).toBe(ResultStatus.BadRequest);
    });

    it('Should confirm email', async () => {
      const code = '123e4567-e89b-12d3-a456-426614174000';

      const { login, password, email } = testSeeder.createUser();
      await testSeeder.insertUser({login, password, email, code});

      const result = await confirmEmail(code);
      expect(result.status).toBe(ResultStatus.NoContent);
    })
  })
});

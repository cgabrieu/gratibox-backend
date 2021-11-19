import '../../src/setup.js';
import clearDatabase from '../utils/database.js';
import connection from '../../src/database/database.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app.js';
import { createUser } from '../factories/userFactory.js';

const request = supertest(app);
const signInRoute = '/auth/sign-in';

afterAll(() => {
  connection.end();
});

beforeEach(clearDatabase);

describe(`POST ${signInRoute}`, () => {
  it('returns status 200 for valid access', async () => {
    const newUser = await createUser();
    const result = await request.post(signInRoute).send(newUser);
    expect(result.status).toEqual(200);
  });

  it('returns status 400 for invalid format inputs', async () => {
    const body = {};
    const result = await request.post(signInRoute).send(body);
    expect(result.status).toEqual(400);
  });

  it('returns invalid msg email for invalid format email', async () => {
    const body = {
      email: faker.name.findName(),
      password: faker.internet.password(8),
    };
    const result = await request.post(signInRoute).send(body);
    expect(result.text).toEqual('"email" must be a valid email');
  });

  it('returns invalid msg for invalid format password', async () => {
    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(5),
    };
    const result = await request.post(signInRoute).send(body);
    expect(result.text).toEqual(
      '"password" length must be at least 6 characters long',
    );
  });
});

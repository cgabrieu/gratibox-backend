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
  })
});

import clearDatabase from '../utils/database.js';
import connection from '../../src/database/database.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app.js';

const request = supertest(app);
const signUpRoute = '/auth/sign-up';

afterAll(() => {
  connection.end();
  clearDatabase();
});

describe(`POST ${signUpRoute}`, () => {

  it('return status 201 for valid access', async () => {
    const userData = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(8),
    };

    const result = await request.post(signUpRoute).send(userData);
    expect(result.status).toEqual(201);
  })

});

import '../../src/setup.js';
import clearDatabase from '../utils/database.js';
import connection from '../../src/database/database.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app.js';

const request = supertest(app);
const subscribeRoute = '/subscribe';

afterAll(() => {
  clearDatabase();
  connection.end();
});

describe(`POST ${subscribeRoute}`, () => {
  it('returns status 201 valid inputs', async () => {
    const body = {
      
    };
    const result = await request.post(subscribeRoute).send(body);
    expect(result.status).toEqual(201);
  })
});

import clearDatabase from '../utils/database.js';
import supertest from 'supertest';
import connection from '../../src/database/database.js';

afterAll(() => {
  connection.end();
  clearDatabase();
});

describe('POST /auth/sign-up', () => {

  it('returns 4 for 2+2', async () => {
    expect(2+2).toEqual(4);
  })

});

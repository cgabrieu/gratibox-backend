import '../../src/setup.js';
import clearDatabase from '../utils/database.js';
import connection from '../../src/database/database.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app.js';
import { createToken } from '../factories/userFactory.js';
import { createSubscription } from '../factories/subscriptionFactory.js';

const request = supertest(app);
const subscriptionRoute = '/subscription';

afterAll(() => {
  connection.end();
});

beforeEach(clearDatabase);

describe(`POST ${subscriptionRoute}`, () => {
  it('returns status 200 for authorized request', async () => {
    const token = await createSubscription();

    const result = await request
      .get(subscriptionRoute)
      .set('x-access-token', token);

    
      expect(result.status).toEqual(200);
  });
});

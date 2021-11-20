import '../../src/setup.js';
import clearDatabase from '../utils/database.js';
import connection from '../../src/database/database.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app.js';
import { createToken } from '../factories/userFactory.js';

const request = supertest(app);
const subscribeRoute = '/subscribe';

afterAll(() => {
  connection.end();
});

beforeEach(clearDatabase);

describe(`POST ${subscribeRoute}`, () => {
  it('returns status 201 for valid inputs', async () => {
    const token = await createToken();

    const body = {
      plan_type: 'Monthly',
      day_month: '10',
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Incensos' },
        { option_name: 'Produtos Orgânicos' },
      ],
    };

    const result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);

    expect(result.status).toEqual(201);
  });

  it('returns status 201 for valid inputs', async () => {
    const token = await createToken();

    const body = {
      plan_type: 'Monthly',
      day_month: '10',
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Incensos' },
        { option_name: 'Produtos Orgânicos' },
      ],
    };

    const result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);

    expect(result.status).toEqual(201);
  });
  
  it('returns status 409 if the user already has a subscription', async () => {
    const token = await createToken();

    const body = {
      plan_type: 'Monthly',
      day_month: '10',
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Incensos' },
        { option_name: 'Produtos Orgânicos' },
      ],
    };

    await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);

    const result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);

    expect(result.status).toEqual(409);
  });

  it('returns status 400 when invalid inputs', async () => {
    const token = await createToken();

    let body = {
      plan_type: faker.lorem.word,
      day_month: '10',
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Incensos' },
        { option_name: 'Produtos Orgânicos' },
      ],
    };
    let result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);
    expect(result.status).toEqual(400);

    body = {
      plan_type: 'Monthly',
      day_month: faker.lorem.word,
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Incensos' },
        { option_name: 'Produtos Orgânicos' },
      ],
    };
    result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);
    expect(result.status).toEqual(400);

    body = {
      plan_type: 'Monthly',
      day_month: '10',
      day_week: 'Sexta',
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Incensos' },
        { option_name: 'Produtos Orgânicos' },
      ],
    };
    result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);
    expect(result.status).toEqual(400);

    body = {
      plan_type: 'Monthly',
      day_week: 'Sexta',
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Chás' },
      ],
    };
    result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);
    expect(result.status).toEqual(400);

    body = {
      plan_type: 'Monthly',
      day_week: 'Sexta',
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Chás' },
      ],
    };
    result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);
    expect(result.status).toEqual(400);

    body = {
      plan_type: 'Monthly',
      receiving_options: [
        { option_name: 'Chás' },
        { option_name: 'Incensos' },
      ],
    };
    result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);
    expect(result.status).toEqual(400);

    body = {
      plan_type: 'Monthly',
      day_week: 'Sexta',
      receiving_options: [
      ],
    };
    result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);
    expect(result.status).toEqual(400);

    body = {
      plan_type: 'Monthly',
      day_week: 'Sexta',
    };
    result = await request
      .post(subscribeRoute)
      .set('x-access-token', token)
      .send(body);
    expect(result.status).toEqual(400);
  });

});

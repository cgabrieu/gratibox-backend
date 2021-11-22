import connection from '../../src/database/database';
import { createToken, createUser } from './userFactory';

async function createSubscription() {
  const subscriptionInfo = {
    plan_type: 'Monthly',
    day: '10',
    receiving_options: [
      { option_name: 'Chás' },
      { option_name: 'Incensos' },
      { option_name: 'Produtos Orgânicos' },
    ],
    address: {
      name: 'Gabriel Testonaldo',
      address: 'Rua dos Testes, Residencial Morada dos Testes',
      cep: '29142-111',
      city: 'Testelândia',
      state: 'ES',
    },
  };

  const userToken = await createToken();

  const resultSubscription = await connection.query(
    `INSERT INTO subscriptions
    (user_id, plan_type, day)
    VALUES ($1, $2, $3)
    RETURNING id;`,
    [userToken.userId, subscriptionInfo.plan_type, subscriptionInfo.day],
  );
  const subscriptionId = resultSubscription.rows[0].id;

  subscriptionInfo.receiving_options.forEach(async (option) => {
    await connection.query(
      `INSERT INTO receiving_option
      (subscription_id, option_name)
      VALUES ($1, $2)`,
      [subscriptionId, option.option_name],
    );
  });

  await connection.query(
    `INSERT INTO addresses
    (user_id, name, address, zip_code, city, state)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      userToken.userId,
      subscriptionInfo.address.name,
      subscriptionInfo.address.address,
      subscriptionInfo.address.cep,
      subscriptionInfo.address.city,
      subscriptionInfo.address.state,
    ],
  );
  return userToken.token;
}

// eslint-disable-next-line import/prefer-default-export
export { createSubscription };

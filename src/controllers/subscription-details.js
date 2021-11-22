import connection from '../database/database.js';

const getAuthenticatedUserId = async (sessionId) => {
  const result = await connection.query(
    'SELECT * FROM sessions WHERE id = $1;',
    [sessionId],
  );
  return result.rows[0].user_id;
};

export default async function subscriptionDetails(req, res) {
  try {
    const userId = await getAuthenticatedUserId(req.sessionId);

    const resultSubscription = await connection.query(
      `SELECT
          subscriptions.plan_type, subscriptions.day,
          receiving_option.option_name, subscriptions.created_at
        FROM subscriptions
        JOIN receiving_option
          ON subscriptions.id = receiving_option.subscription_id
        WHERE subscriptions.user_id = $1;`,
      [userId],
    );

    const subscription = resultSubscription.rows;

    if (!subscription.length) res.status(404).send('Assinatura não encontrada!');

    const receivingOptions = subscription.map((product) => ({
      option_name: product.option_name,
    }));

    return res.status(200).send({
      plan_type: subscription[0].plan_type,
      day: subscription[0].day,
      receiving_options: receivingOptions,
      created_at: subscription[0].created_at,
    });
  } catch (error) {
    return res.status(500);
  }
}

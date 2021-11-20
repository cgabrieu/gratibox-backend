import connection from '../database/database.js';
import { subcribeSchema } from '../schemas/subscriptionSchemes.js';

const getAuthenticatedUserId = async (sessionId) => {
  const result = await connection.query(
    'SELECT * FROM sessions WHERE id = $1;',
    [sessionId],
  );
  return result.rows[0].user_id;
};

export default async function subscribe(req, res) {
  try {
    const {
      plan_type: planType,
      day_month: dayMonth,
      day_week: dayWeek,
      receiving_options: receivingOptions,
    } = req.body;

    const userId = await getAuthenticatedUserId(req.sessionId);

    const validationResult = subcribeSchema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const resultSubscriptions = await connection.query(
      'SELECT * FROM subscriptions WHERE user_id = $1',
      [userId],
    );

    if (resultSubscriptions.rowCount > 0) {
      return res.status(409).send('Usuário já possui assinatura.');
    }

    const resultSubscription = await connection.query(
      `INSERT INTO subscriptions
      (user_id, plan_type, ${dayMonth ? 'day_month' : 'day_week'})
      VALUES ($1, $2, $3)
      RETURNING id;`,
      [userId, planType, (dayMonth || dayWeek)],
    );
    const subscriptionId = resultSubscription.rows[0].id;

    receivingOptions.forEach(async (option) => {
      await connection.query(
        `INSERT INTO receiving_option
        (subscription_id, option_name)
        VALUES ($1, $2)`,
        [subscriptionId, option.option_name],
      );
    });

    return res.status(201).send(`Assinatura (${planType} - Dia ${dayMonth || dayWeek}) registrada.`);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

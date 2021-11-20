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

    await connection.query(
      `INSERT INTO subscriptions
          (user_id, plan_type, ${dayMonth ? 'day_month' : 'day_week'})
          VALUES ($1, $2, $3)`,
      [userId, planType, (dayMonth || dayWeek)],
    );

    return res.status(201).send(`Assinatura ${planType} - dia ${dayMonth || dayWeek} registrada.`);

    // return res.status(401).send('E-mail ou senha inválidos');
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

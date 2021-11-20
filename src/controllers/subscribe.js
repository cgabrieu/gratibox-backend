import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../database/database.js';
import { subcribeSchema } from '../schemas/subscriptionSchemes.js';

export default async function subscribe(req, res) {
  try {
    const {
      plan_type: planType,
      day_month: dayMonth,
      day_week: dayWeek,
      receiving_options: receivingOptions,
    } = req.body;

    const validationResult = subcribeSchema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    return res.send({
      planType,
      dayMonth,
      dayWeek,
      receivingOptions,
    });

    // return res.status(401).send('E-mail ou senha inválidos');
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

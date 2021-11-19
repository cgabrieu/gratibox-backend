import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { signInSchema } from '../schemas/usersSchemas.js';

export default async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const validationResult = signInSchema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const resultUser = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email],
    );

    const user = resultUser.rows[0];

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

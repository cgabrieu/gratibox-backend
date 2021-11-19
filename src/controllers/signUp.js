import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { signUpSchema } from '../schemas/usersSchemas.js';

export default async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const validationResult = signUpSchema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const resultUser = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email],
    );

    if (resultUser.rowCount > 0) {
      return res.status(409).send('Usuário já existente.');
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await connection.query(
      `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3);`,
      [name, email, hashPassword],
    );

    return res.status(201).send('Conta criada com sucesso.');
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

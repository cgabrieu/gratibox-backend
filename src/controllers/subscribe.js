import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../database/database.js';
import { signInSchema } from '../schemas/usersSchemas.js';

export default async function subscribe(req, res) {
  try {
    const { } = req.body;

    return res.status(401).send('E-mail ou senha inválidos');
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

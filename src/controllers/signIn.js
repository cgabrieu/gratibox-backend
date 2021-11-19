import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { signUpSchema } from '../schemas/usersSchemas.js';

export default async function signIn(req, res) {
  try {
    
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

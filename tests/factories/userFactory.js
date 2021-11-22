import faker from 'faker/locale/pt_BR';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../../src/database/database';

async function createUser() {
  const password = faker.internet.password(8);
  const hash = bcrypt.hashSync(password, 10);

  const newUser = await connection.query(
    `INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, email, password;`,
    [faker.name.findName(), faker.internet.email(), hash],
  );

  newUser.rows[0].password = password;
  return newUser.rows[0];
}

async function createSession() {
  const { id: userId } = await createUser();
  const result = await connection.query(
    `INSERT INTO sessions 
    (user_id) VALUES ($1)
    RETURNING id;`,
    [userId],
  );
  return {
    id: result.rows[0].id,
    userId,
  };
}

async function createToken() {
  const session = await createSession();
  const token = jwt.sign(
    { sessionId: session.id },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 },
  );

  return {
    token,
    userId: session.userId,
  };
}

export { createUser, createSession, createToken };

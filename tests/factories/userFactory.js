import faker from 'faker/locale/pt_BR';
import bcrypt from 'bcrypt';
import connection from '../../src/database/database';

async function createUser() {
  const password = faker.internet.password(8);
  const hash = bcrypt.hashSync(password, 10);

  const newUser = await connection.query(
    `INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING email, password;`,
    [faker.name.findName(), faker.internet.email(), hash],
  );

  newUser.rows[0].password = password;
  return newUser.rows[0];
}

export { createUser };

import connection from '../../src/database/database';

export default async function clearDatabase() {
  await connection.query('TRUNCATE users, addresses, sessions, users, subscriptions, receiving_option CASCADE;');
}

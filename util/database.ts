import dotenv from 'dotenv';
import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';
import { User } from './types';
import { Session } from 'inspector';

dotenv.config();
const sql = postgres();

export async function getUsers() {
  const users = await sql`
  SELECT * FROM users`;

  return users.map(camelcaseKeys);
}

export async function getUserById(id: number) {
  const user = await sql<User[]>`
  SELECT * FROM users WHERE id = ${id}`;
  console.log('getUserById', user[0]);

  return camelcaseKeys(user[0]);
}

export async function getUserByUsername(username: string) {
  const user = await sql<User[]>`
  SELECT * FROM users WHERE username = ${username}`;
  console.log('getUserByUsername', user[0]);

  return camelcaseKeys(user[0]);
}

export async function signupUser(username: string, passwordHash: string) {
  const users = await sql<User[]>`
  INSERT INTO users(username, password_hash) 
  VALUES(${username}, ${passwordHash})
  RETURNING *;`;
  return users.map((user: User) => camelcaseKeys(user))[0];
}

export async function insertSession(token: string, userId: string) {
  const sessions = await sql<Session[]>`
  INSERT INTO sessions
  (token, user_id)
  VALUES
  (${token}, ${userId})
  RETURNING *`;
  return sessions.map((session: Session) => camelcaseKeys(session))[0];
}

export async function getSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
  SELECT * FROM sessions WHERE token = ${token}`;
  return sessions.map((session: Session) => camelcaseKeys(session))[0];
}

// Example of a database query with an Inner Join -> find out why?!
export async function getUserBySessionToken(token: string) {
  const users = await sql<User[]>`SELECT users.id,
  username
  FROM 
  users, 
  sessions
   WHERE 
   sessions.token = ${token} AND
   users.id = sessions.user_id`;
  return users.map((u) => camelcaseKeys(u))[0];
}

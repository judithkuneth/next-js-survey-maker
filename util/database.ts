import dotenv from 'dotenv';
import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';
import { User } from './types';

dotenv.config();
const sql = postgres();

export async function getUsers() {
  const users = await sql`
  SELECT * FROM users`;

  return users.map(camelcaseKeys);
}

export async function getUserById(id: number) {
  const user = await sql`
  SELECT * FROM users WHERE id = ${id}`;
  console.log('getUserById', user);

  return camelcaseKeys(user[0]);
}

export async function getUserByUsername(username: string) {
  const user = await sql<User[]>`
  SELECT * FROM users WHERE username = ${username}`;
  console.log('getUserByUsename', user);

  return camelcaseKeys(user[0]);
}

export async function signupUser(username: string, passwordHash: string) {
  const users = await sql<User[]>`
  INSERT INTO users(username, password_hash) 
  VALUES(${username}, ${passwordHash})
  RETURNING *;`;
  return users.map((u) => camelcaseKeys(u))[0];
}

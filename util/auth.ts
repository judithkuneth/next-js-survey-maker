import { getSessionByToken } from './database';

export async function isTokenValid(token: string | undefined) {
  if (typeof token === 'undefined') {
    console.log('typeof token === undefined');
    return false;
  }

  const session = await getSessionByToken(token);
  console.log('getSessionByToken(token)', await getSessionByToken(token));
  console.log('typeofsession', typeof session);
  if (typeof session === 'undefined') {
    return false;
  }
  console.log('session is defined', session);
  const parsedTimestamp = Date.parse(session.expiryTimestamp);

  const dateNow = Date.now();

  if (parsedTimestamp > dateNow) return true;
  console.log('token is valid');
}

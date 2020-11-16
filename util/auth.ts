import { getSessionByToken } from './database';

export async function isTokenValid(token: string | undefined) {
  if (typeof token === 'undefined') {
    return false;
  }

  const session = await getSessionByToken(token);

  if (typeof session === undefined) {
    return false;
  }

  console.log(session.expiryTimestamp);
  const parsedTimestamp = Date.parse(session.expiryTimestamp);

  const dateNow = Date.now();

  // if (session.expiryTimestamp < newDateString)
  if (parsedTimestamp < dateNow)
    // if (parsedTimestamp < new Date()) {
    //   return false;
    // }
    return true;
}

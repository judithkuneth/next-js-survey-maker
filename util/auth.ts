import { getSessionByToken } from './database';

export async function isTokenValid(token: string | undefined) {
  console.log(
    'lets try this',
    getSessionByToken('iF01m2BmaQZl8K0S3zK+ow+oRBCe5H/H'),
  );
  if (typeof token === 'undefined') {
    return false;
  }

  const session = await getSessionByToken(token);
  console.log('getSessionByToken(token)', await getSessionByToken(token));
  console.log('typeofsession', typeof session);
  if (typeof session === undefined) {
    return false;
  }
  console.log('session', session);
  const parsedTimestamp = Date.parse(session.expiryTimestamp);

  const dateNow = Date.now();

  if (parsedTimestamp > dateNow) return true;
}

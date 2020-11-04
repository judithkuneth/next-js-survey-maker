import { getSessionByToken } from './database';

export async function isTokenValid(token: string) {
  const session = await getSessionByToken(token);
  if (session.expiryTimestamp < new Date()) {
    return false;
  }
  return Boolean(await getSessionByToken(token));
}

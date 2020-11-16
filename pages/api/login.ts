import crypto from 'crypto';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserByUsername,
  insertSession,
  deleteExpiredSessions,
} from '../../util/database';
import argon2 from 'argon2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);

  if (typeof user === 'undefined') {
    return res.status(401).send({ success: false });
  }

  const passwordVerified = await argon2.verify(user.passwordHash, password);

  if (!passwordVerified) {
    return res.status(401).send({ success: false });
  }

  const randomCrypto = crypto.randomBytes(24);
  const token = randomCrypto.toString('base64');

  // const session = await insertSession(token, user.id);

  const maxAge = 60 * 60 * 24; // 24hours
  const isProduction = process.env.NODE_ENV === 'production';

  const sessionCookie = cookie.serialize('session', token, {
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000), //because measured in milliseconds
    httpOnly: true, //security: deny cookie access from frontend JavScript
    secure: isProduction, //security: set secure cookie in production
    path: '/', //where cookie can be read
    sameSite: 'lax', //security
  });

  res.setHeader('Set-Cookie', sessionCookie);

  console.log('req.body', req.body);
  res.send({ success: true });

  await deleteExpiredSessions();
}

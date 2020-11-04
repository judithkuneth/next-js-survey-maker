import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByUsername, insertSession } from '../../util/database';
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

  const token = crypto.randomBytes(24).toString('base64');

  const session = await insertSession(token, user.id);
  console.log('session', session);
  console.log('req.body', req.body);
  res.send({ success: true });
}

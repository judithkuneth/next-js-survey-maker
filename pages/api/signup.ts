import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import Tokens from 'csrf';
import { signupUser, getUserByUsername } from '../../util/database';

const tokens = new Tokens();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password, token } = req.body;
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    res.status(500).send({ success: false });
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }
  const verified = tokens.verify(secret, token);

  if (!verified) return res.status(401).send({ success: false });

  const user = await getUserByUsername(username);
  if (typeof user !== 'undefined') {
    return res.status(403).send({ success: false });
  }

  try {
    const passwordHash = await argon2.hash(password);
    await signupUser(username, passwordHash);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ sucess: true });
}

import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import Tokens from 'csrf';
import {
  signupUser,
  getUserByUsername,
  editSurveyWhereSlugIs,
} from '../../util/database';

const tokens = new Tokens();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password, token, slug, userId } = req.body;
  const secret = process.env.CSRF_TOKEN_SECRET;

  console.log('req.body', req.body);

  if (typeof secret === 'undefined') {
    res.status(500).send({ success: false });
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }
  const verified = tokens.verify(secret, token);

  if (!verified) return res.status(401).send({ success: false });

  const user = await getUserByUsername(username);
  console.log('user', typeof user);
  console.log('username', username);

  if (typeof user !== 'undefined') {
    return res.status(403).send({ success: false });
  }

  try {
    const passwordHash = await argon2.hash(password);
    await signupUser(username, passwordHash);
  } catch (err) {
    return res.status(500).send({ success: false });
  }

  try {
    await editSurveyWhereSlugIs(slug, userId);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ success: true });
}

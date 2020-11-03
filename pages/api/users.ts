import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await getUsers();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ users: users }));
}

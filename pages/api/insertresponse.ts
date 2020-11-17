import { NextApiRequest, NextApiResponse } from 'next';
// import { useRouter } from 'next/router';
import { insertResponse } from '../../util/database';

export default async function insertResponseHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const router = useRouter();
  const { responseValues } = req.body;

  console.log('req.body', req.body);

  try {
    await insertResponse(responseValues);
  } catch (err) {
    return res.status(500).send({ success: false });
  }

  res.send({ success: true });
  // router.push('/edit/1')
}

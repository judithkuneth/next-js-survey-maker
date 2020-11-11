import { NextApiRequest, NextApiResponse } from 'next';
// import { useRouter } from 'next/router';
import { addSurvey } from '../../util/database';

export default async function newSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const router = useRouter();
  const { userId, title, customSlug } = req.body;

  console.log('req.body', req.body);

  try {
    await addSurvey(userId, title, customSlug);
  } catch (err) {
    return res.status(500).send({ success: false });
  }

  res.send({ success: true });
  // router.push('/s/1')
}

import { NextApiRequest, NextApiResponse } from 'next';
// import { useRouter } from 'next/router';
import { addSurvey, getSurveyBySlug } from '../../util/database';

export default async function newSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const router = useRouter();
  const { userId, title, customSlug } = req.body;

  console.log('req.body', req.body);

  const survey = await getSurveyBySlug(customSlug);
  console.log('typeof survey', typeof survey);
  if (typeof survey !== 'undefined') {
    return res.status(403).send({ success: false });
  }

  try {
    await addSurvey(userId, title, customSlug);
  } catch (err) {
    return res.status(500).send({ success: false });
  }

  res.send({ success: true });
  // router.push('/edit/1')
}

import { NextApiRequest, NextApiResponse } from 'next';
import { getQuestionWhereSurveyIdIs } from '../../util/database';

export default async function editQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { surveyId } = req.body;

  console.log('req.body', req.body);
  try {
    await getQuestionWhereSurveyIdIs(surveyId);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ success: true });
}

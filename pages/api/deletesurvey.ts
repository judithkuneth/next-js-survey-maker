import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSurveyWhereIdIs } from '../../util/database';

export default async function deleteSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.body;

  console.log('req.body', req.body);
  try {
    await deleteSurveyWhereIdIs(id);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ success: true });
}

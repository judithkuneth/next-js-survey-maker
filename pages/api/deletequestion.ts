import { NextApiRequest, NextApiResponse } from 'next';
import { deleteQuestionWhereIdIs } from '../../util/database';

export default async function deleteQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { questionId } = req.body;

  console.log('req.body', req.body);
  try {
    await deleteQuestionWhereIdIs(questionId);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ success: true });
}

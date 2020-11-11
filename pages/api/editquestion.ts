import { NextApiRequest, NextApiResponse } from 'next';
import { editQuestionWhereIdIs } from '../../util/database';

export default async function editQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    questionId,
    itemOrder,
    questionType,
    title,
    valueMin,
    valueMax,
    descriptionMin,
    descriptionMax,
  } = req.body;

  console.log('req.body', req.body);
  try {
    await editQuestionWhereIdIs(
      questionId,
      itemOrder,
      questionType,
      title,
      valueMin,
      descriptionMin,
      valueMax,
      descriptionMax,
    );
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ success: true });
}

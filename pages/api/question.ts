import { NextApiRequest, NextApiResponse } from 'next';
import { addQuestion } from '../../util/database';
import { Question } from '../../util/types';

export default async function newQuestionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    surveyId,
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
    await addQuestion(
      surveyId,
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

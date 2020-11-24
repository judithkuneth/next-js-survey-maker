import { NextApiRequest, NextApiResponse } from 'next';
import { editSurveyWhereSlugIs, getUserByUsername } from '../../util/database';

export default async function editSurveyHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug, username } = req.body;

  console.log('req.body', req.body);
  const user = await getUserByUsername(username);
  const userId = user.id;
  try {
    await editSurveyWhereSlugIs(slug, userId);
  } catch (err) {
    return res.status(500).send({ success: false });
  }
  res.send({ success: true });
}

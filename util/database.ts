import dotenv from 'dotenv';
import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';
import {
  User,
  Survey,
  Session,
  SerializedSurvey,
  Question,
  Response,
  ResponseInput,
  QuestionId,
} from './types';
// import { Session } from 'inspector';

// const sql = postgres();

require('dotenv').config();
dotenv.config();

import extractHerokuDatabaseEnvVars from '../extractHerokuDatabaseEnvVars';
extractHerokuDatabaseEnvVars();

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

// ------------USERS -----------------------

// export async function getUsers() {
//   const users = await sql`
//   SELECT * FROM users`;

//   return users.map((user:User)=>camelcaseKeys(user));
// }

// export async function getSessionByToken(token: string) {
//   const session = await sql<Session[]>`
//   SELECT * FROM sessions WHERE token = ${token}`;
//   console.log('getUserIdBySessionbyToken', session[0]);

//   return camelcaseKeys(session[0]);
// }
export async function getUserById(id: number) {
  const user = await sql<User[]>`
  SELECT * FROM users WHERE id = ${id}`;
  console.log('getUserById', user[0]);

  return camelcaseKeys(user[0]);
}

export async function getUserByUsername(username: string) {
  const user = await sql<User[]>`
  SELECT * FROM users WHERE username = ${username}`;
  console.log('getUserByUsername', user[0]);
  console.log('return in DB user', user);
  return camelcaseKeys(user[0]);
}

export async function signupUser(username: string, passwordHash: string) {
  const users = await sql<User[]>`
  INSERT INTO users(username, password_hash) 
  VALUES(${username}, ${passwordHash})
  RETURNING *;`;
  return users.map((user: User) => camelcaseKeys(user))[0];
}

// ------------ SESSIONS ------------------

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
  INSERT INTO sessions
  (token, user_id, expiry_Timestamp)
  VALUES
  (${token}, ${userId}, NOW()+INTERVAL'1 hour')
  RETURNING *`;
  return sessions.map((session: Session) => camelcaseKeys(session))[0];
}

export async function deleteExpiredSessions() {
  await sql`
  DELETE from sessions WHERE expiry_timestamp < NOW()`;
}

export async function getSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
  SELECT * FROM sessions WHERE token = ${token}`;
  return sessions.map((session: Session) => camelcaseKeys(session))[0];
}

// Example of a database query with an Inner Join -> find out why?!
export async function getUserBySessionToken(token: string) {
  const users = await sql<User[]>`SELECT users.id,
  username
  FROM 
  users, 
  sessions
   WHERE 
   sessions.token = ${token} AND
   users.id = sessions.user_id`;
  return users.map((u) => camelcaseKeys(u))[0];
}

// ------------ SURVEYS ------------------

export async function addSurvey(
  userId: number,
  title: string,
  customSlug: string,
) {
  console.log(
    'adding survey with userId, title and slug',
    userId,
    title,
    customSlug,
  );
  const surveys = await sql<Survey[]>`
  INSERT INTO surveys(user_id, title, custom_slug, published) 
  VALUES(${userId}, ${title}, ${customSlug}, false)
  RETURNING *;`;
  console.log('added survey');
  return surveys.map((survey: Survey) => camelcaseKeys(survey))[0];
}

export async function getSurveysByUserId(userId: number) {
  const dummySurvey = [
    { id: 0, title: 'My first survey [dummy]', published: false },
  ];
  const surveys = await sql<SerializedSurvey[]>`
  SELECT * FROM surveys WHERE user_id = ${userId}`;
  console.log('getSurveysbyUserId in database', surveys.count);
  if (surveys.count === 0) return dummySurvey.map((d) => camelcaseKeys(d));
  return surveys.map((u) => camelcaseKeys(u));
}

export async function getSurveysBySurveyId(id: number) {
  const surveys = await sql<SerializedSurvey[]>`
  SELECT * FROM surveys WHERE id = ${id}`;
  console.log('getSurveysbySurveyId in database', surveys[0].id);

  return surveys.map((u) => camelcaseKeys(u))[0];
}

export async function getSurveyBySlug(slug: string) {
  const surveys = await sql<SerializedSurvey[]>`
  SELECT * FROM surveys WHERE custom_slug = ${slug}`;
  console.log('getSurveybySlug in database', surveys[0]);

  return surveys.map((u) => camelcaseKeys(u))[0];
}

export async function editSurveyWhereSlugIs(slug: string, userId: number) {
  console.log('in DB: update survey by slug:', slug, 'userId:', userId);
  const survey = await sql<Survey[]>`
UPDATE surveys SET user_id = ${userId} WHERE custom_slug = ${slug};`;
  return camelcaseKeys(survey)[0];
}

export async function deleteSurveyWhereIdIs(id: number) {
  const surveys = await sql<Survey[]>`
  DELETE from surveys WHERE id = ${id}
  RETURNING *;`;
  return surveys.map((survey: Survey) => camelcaseKeys(survey))[0];
}

// ------------ Questions ------------------

export async function addQuestion(
  surveyId: number,
  itemOrder: number,
  questionType: string,
  title: string,
  valueMin: string,
  descriptionMin: string,
  valueMax: string,
  descriptionMax: string,
) {
  const questions = await sql<Question[]>`
  INSERT INTO questions(survey_id,item_order,question_type,title,value_min,description_min,value_max,description_max)
  VALUES(${surveyId},${itemOrder},${questionType},${title},${valueMin},${descriptionMin},${valueMax},${descriptionMax})
  RETURNING *;`;
  return questions.map((question: Question) => camelcaseKeys(question))[0];
}

export async function editQuestionWhereIdIs(
  id: number,
  itemOrder: number,
  questionType: string,
  title: string,
  valueMin: string,
  descriptionMin: string,
  valueMax: string,
  descriptionMax: string,
) {
  const questions = await sql<Question[]>`
  UPDATE questions SET item_order = ${itemOrder}, question_type = ${questionType}, title = ${title}, value_min = ${valueMin}, description_min = ${descriptionMin}, value_max = ${valueMax}, description_max = ${descriptionMax} WHERE id = ${id}
  RETURNING *;`;
  return questions.map((question: Question) => camelcaseKeys(question))[0];
}

export async function deleteQuestionWhereIdIs(id: number) {
  const questions = await sql<Question[]>`
  DELETE from questions WHERE id = ${id}
  RETURNING *;`;
  return questions.map((question: Question) => camelcaseKeys(question))[0];
}

export async function getQuestionWhereSurveyIdIs(id: number) {
  const questions = await sql<Question[]>`
  SELECT*from questions WHERE survey_id = ${id}
  ;`;
  // return camelcaseKeys(questions);
  return questions.map((question: Question) => camelcaseKeys(question));
}

// ------------ Responses ------------------

export async function insertResponse(responseValues: ResponseInput[]) {
  async function addResponse(questionId: number, responseValue: number) {
    console.log('questionId:', questionId, 'responseValue:', responseValue);
    await sql<Response[]>`
  INSERT INTO responses
  (question_id, response_value)
  VALUES
  (${questionId},${responseValue})
  RETURNING *`;
  }

  return responseValues.map((response: ResponseInput) =>
    camelcaseKeys(addResponse(response.questionId, response.responseValue)),
  )[0];
}

export async function getResponsesByQuestionId(id: number) {
  const responses = await sql<Response[]>`
  SELECT*from responses WHERE question_id = ${id}
  ;`;
  return responses.map((response: Response) => camelcaseKeys(response));
}

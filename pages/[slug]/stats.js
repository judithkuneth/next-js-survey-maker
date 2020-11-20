/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/core';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import { isTokenValid } from '../../util/auth';

export default function stats(props) {
  const survey = props.survey;
  const questions = props.questions;
  const responses = props.responses;
  // console.log('responses', responses);
  if (survey !== undefined) {
    return (
      <Layout>
        <h1>Stats</h1>
        {survey.title}
        {questions.map((question) => {
          return (
            <div>
              <br />
              {question.title}
              <br />
              {question.valueMin}
              {question.descriptionMin}
              <input type="range"></input>
              {question.valueMax}
              {question.descriptionMay}
              <br />
            </div>
          );
        })}

        {responses.map((response) => {
          return (
            <div>
              <br />
              id: {response.questionId}
              <br />
              id: {response.id}
              <br />
              value: {response.responseValue}
              <br />
            </div>
          );
        })}
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>You have no access</h1>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);

  console.log('await', await isTokenValid(session));
  console.log(session);

  if (await isTokenValid(session)) {
    console.log(
      'you have access to statistsics step 1 because your token is valid',
    );
    // (session !== undefined)
    const { getSessionByToken } = await import('../../util/database');
    const sessionByToken = await getSessionByToken(session);
    const userId = sessionByToken.userId;
    console.log('session.userId', sessionByToken.userId);
    const { getUserById } = await import('../../util/database');
    const user = await getUserById(userId);
    user.createdAt = JSON.stringify(user.createdAt);

    const slug = context.query.slug;
    const { getSurveyBySlug } = await import('../../util/database');
    const survey = await getSurveyBySlug(slug);

    // const { getQuestionWhereSurveyIdIs } = await import('../../util/database');

    // const questions = await getQuestionWhereSurveyIdIs(survey.id);
    // if (survey.userId === user.id) {
    //   console.log('user id === survey.userId');
    // }

    if (survey.userId === user.id) {
      console.log('you have access');

      const { getQuestionWhereSurveyIdIs } = await import(
        '../../util/database'
      );

      const questions = await getQuestionWhereSurveyIdIs(survey.id);

      console.log('questions', questions);

      const { getResponsesWhereQuestionIdIs } = await import(
        '../../util/database'
      );

      const responses = await getResponsesWhereQuestionIdIs(questions[0].id);
      console.log('questions[0].id', questions[0].id);
      console.log('response', responses);
      // console.log(
      //   'response.map',
      //   (await response).map((r) => r.id),
      // );

      return {
        props: { user, survey, questions, responses },
      };
    }

    //   const { getQuestionWhereSurveyIdIs } = await import(
    //     '../../util/database'
    //   );

    //   const questions = await getQuestionWhereSurveyIdIs(survey.id);

    //   const { getResponsesWhereQuestionIdIs } = await import(
    //     '../../util/database'
    //   );

    //   const responses = questions.map((question) => {
    //     return getResponsesWhereQuestionIdIs(question.id);
    //   });

    //   return { props: { survey, questions, responses } };
    // }

    return {
      props: {},
    };
  }
  return {
    props: {},
  };
}

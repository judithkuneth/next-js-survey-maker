/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/core';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import { isTokenValid } from '../../util/auth';
import BarChartComponent from '../../components/BarChartComponent';

export default function stats(props) {
  if (props.access === true) {
    const survey = props.survey;
    const questions = props.questions;
    console.log('stats.js: questions', questions);
    const responses = props.responses;
    console.log('stats.js: responses', responses);
    const responsesSimplified = responses.flat();

    console.log(
      'stats.js: simplified responses, .lenght',
      responsesSimplified,
      responsesSimplified.length,
    );

    return (
      <Layout username={props.user.username}>
        <h1>Stats</h1>
        {survey.title}
        {questions.map((question) => {
          return (
            <div>
              <br />
              {question.title}
              <BarChartComponent
                question={question}
                responses={responsesSimplified}
              />
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

        {responses[0].map((response) => {
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
  } else
    return (
      <Layout username={props.user.username}>
        <h1>You have no access</h1>
      </Layout>
    );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);

  console.log('await', await isTokenValid(session));
  console.log(session);

  if (await isTokenValid(session)) {
    console.log('token valid');
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

    if (survey.userId === user.id) {
      console.log('you have access');

      const { getQuestionWhereSurveyIdIs } = await import(
        '../../util/database'
      );

      const questions = await getQuestionWhereSurveyIdIs(survey.id);

      console.log('questions', questions);

      const responsesByQuestions = await Promise.all(
        questions.map(async (id) => {
          const { getResponsesByQuestionId } = await import(
            '../../util/database'
          );
          const responses = await getResponsesByQuestionId(id.id);
          return responses;
        }),
      );

      console.log('asyncRes', responsesByQuestions);

      return {
        props: {
          user,
          survey,
          questions,
          responses: responsesByQuestions,
          access: true,
        },
      };
    }

    return {
      props: { user, access: false },
    };
  }
  return {
    props: { access: false },
  };
}

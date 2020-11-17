/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import EditQuestionComponent from '../../components/EditQuestionComponent';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import QuestionComponent from '../../components/QuestionComponent';
import Link from 'next/link';

// import { getQuestionWhereSurveyIdIs,getSurveysByUserId } from '../../util/database';

export default function dashboard(props) {
  const username = props.user.username;
  console.log('username', username);
  // console.log('get cookie username', cookie.get.JSON('username'))
  const surveyId = props.surveyId;
  const questions = props.questions;
  const survey = props.survey;

  return (
    <Layout username={username}>
      <h2>{survey.title}!</h2>
      <div>
        {questions.map((question) => {
          return (
            <div>
              {question.title}
              <EditQuestionComponent question={question} surveyId={survey.id} />
            </div>
          );
        })}
        <Link href={`/edit/${survey.id}`}>
          <button>Refresh</button>
        </Link>
        <h2>Add a new question</h2>
        <QuestionComponent survey={survey} />
        <br />
        <br />
        <br />
        <button
          onClick={(e) => {
            window.location.href = `/r/${survey.customSlug}`;
          }}
        >
          preview
        </button>
        <button
          onClick={(e) => {
            window.location.href = `/${username}`;
          }}
        >
          save as draft
        </button>
        <button
          onClick={(e) => {
            window.location.href = `/r/${survey.customSlug}`;
          }}
        >
          publish{' '}
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { username } = nextCookies(context);
  console.log('username', username);
  const { getUserByUsername } = await import('../../util/database');
  const user = await getUserByUsername(username);
  user.createdAt = JSON.stringify(user.createdAt);
  const surveyId = context.query.surveyId;
  console.log('query', context.query);

  const { getSurveysBySurveyId } = await import('../../util/database');
  const survey = await getSurveysBySurveyId(surveyId);
  console.log('gettingsurvey by surveyid:', surveyId, survey);

  const { getQuestionWhereSurveyIdIs } = await import('../../util/database');
  const questions = await getQuestionWhereSurveyIdIs(surveyId);
  console.log('gettingquestions by surveyid:', surveyId, questions);

  return {
    props: { user, survey, surveyId, questions },
  };
}

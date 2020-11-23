/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import EditQuestionComponent from '../../components/EditQuestionComponent';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import AddQuestionComponent from '../../components/AddQuestionComponent';
import Link from 'next/link';
import { isTokenValid } from '../../util/auth';

// import { getQuestionWhereSurveyIdIs,getSurveysByUserId } from '../../util/database';

export default function dashboard(props) {
  const user = props.user;
  if (user.id > 0) {
    const username = user.username;
    // props.user.username;
    console.log('user', user);
    // console.log('get cookie username', cookie.get.JSON('username'))
    const surveyId = props.surveyId;
    const slug = props.slug;
    const questions = props.questions;
    const survey = props.survey;

    function checkIfLoggedIn() {
      if (user.id === 1)
        return (window.location.href = `/signup?returnTo=/${slug}/edit`);
      else return (window.location.href = `/${slug}`);
    }
    return (
      // <div>Hello World</div>
      <Layout username={username}>
        <h2>{survey.title}!</h2>
        <div>
          {questions.map((question) => {
            return (
              <div>
                <EditQuestionComponent
                  question={question}
                  surveyId={survey.id}
                />
                <br />
                <br />
              </div>
            );
          })}
          <Link href={`/${slug}/edit`}>
            <button>Refresh</button>
          </Link>
          <h2>Add a new question</h2>
          <AddQuestionComponent survey={survey} />
          <br />
          <br />
          <br />
          <button
            onClick={(e) => {
              window.location.href = `/${slug}`;
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
              checkIfLoggedIn();
              // window.location.href = `/r/${slug}`;
            }}
          >
            publish{' '}
          </button>
        </div>
      </Layout>
    );
  }
  return <Layout>Hello World</Layout>;
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);
  console.log('session', session);
  const slug = context.query.slug;
  if (await isTokenValid(session)) {
    const check = await isTokenValid(session);
    console.log('check', check);
    console.log('hello there?');
    console.log('token valid');
    const { getSessionByToken } = await import('../../util/database');
    const sessionByToken = await getSessionByToken(session);
    console.log('sessionByToken', sessionByToken);

    const userId = sessionByToken.userId;
    console.log('userId', sessionByToken.userId);

    const { getUserById } = await import('../../util/database');
    const user = await getUserById(userId);
    console.log('user wtf', user);
    user.createdAt = JSON.stringify(user.createdAt);

    // const surveyId = context.query.surveyId;
    console.log('query', context.query);

    const { getSurveyBySlug } = await import('../../util/database');
    const survey = await getSurveyBySlug(slug);
    // console.log('gettingsurvey by surveyid:', surveyId, survey);

    const { getQuestionWhereSurveyIdIs } = await import('../../util/database');
    const questions = await getQuestionWhereSurveyIdIs(survey.id);
    console.log('gettingquestions by surveyid:', survey.id, questions);

    return {
      props: { user, slug, survey, questions },
    };
  }
  const dummyUser = { id: 1, username: 'dummy' };
  const { getSurveyBySlug } = await import('../../util/database');
  const survey = await getSurveyBySlug(slug);
  console.log('gettingsurvey by lug:', slug, survey);

  const { getQuestionWhereSurveyIdIs } = await import('../../util/database');
  const questions = await getQuestionWhereSurveyIdIs(survey.id);
  console.log('gettingquestions by surveyid:', survey.id, questions);
  return { props: { slug: slug, user: dummyUser, survey, questions } };
}

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
  const access = props.access;
  if (access === true) {
    const username = user.username;
    // props.user.username;
    console.log('user', user);
    // console.log('get cookie username', cookie.get.JSON('username'))
    const surveyId = props.surveyId;
    const slug = props.slug;
    const questions = props.questions;
    const survey = props.survey;

    // function checkIfLoggedIn() {
    //   if (user.id === 1)
    //     return (window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`);
    //   else return (window.location.href = `/${slug}`);
    // }
    return (
      <Layout username={username}>
        <h2>{survey.title}</h2>
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

          <h2>Add a new question</h2>
          <AddQuestionComponent survey={survey} />
          <br />
          <br />
          <br />

          {user.id === 1 ? (
            <div>
              <button
                onClick={(e) => {
                  window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
                }}
              >
                preview
              </button>
              <button
                onClick={(e) => {
                  window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
                }}
              >
                save as draft
              </button>
              <button
                onClick={(e) => {
                  window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
                }}
              >
                publish
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={(e) => {
                  window.location.href = `/${slug}/view`;
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
                  window.location.href = `/${slug}`;
                }}
              >
                publish
              </button>
            </div>
          )}
        </div>
      </Layout>
    );
  }
  return (
    <Layout username={props.user.username}>
      Sorry you have no access to this page.
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);
  const slug = context.query.slug;

  const { getSurveyBySlug } = await import('../../util/database');
  const survey = await getSurveyBySlug(slug);

  const { getQuestionWhereSurveyIdIs } = await import('../../util/database');
  const questions = await getQuestionWhereSurveyIdIs(survey.id);

  if (await isTokenValid(session)) {
    console.log('token valid');
    const { getSessionByToken } = await import('../../util/database');
    const sessionByToken = await getSessionByToken(session);

    const userId = sessionByToken.userId;
    const { getUserById } = await import('../../util/database');
    const user = await getUserById(userId);

    user.createdAt = JSON.stringify(user.createdAt);

    if (survey.userId === user.id) {
      return {
        props: { access: true, user, slug, survey, questions },
      };
    } else return { props: { access: false, user } };
  }
  const dummyUser = { id: 1 };
  if (survey.userId == dummyUser.id) {
    return {
      props: { access: true, slug: slug, user: dummyUser, survey, questions },
    };
  } else return { props: { access: false } };
}

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import EditQuestionComponent from '../../components/EditQuestionComponent';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import AddQuestionComponent from '../../components/AddQuestionComponent';
import Link from 'next/link';
import { isTokenValid } from '../../util/auth';

const componentStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  // margin: 10px;
  // max-width: 400px;
  div {
    align-content: center;
  }
`;

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
        <div css={componentStyles}>
          <div
            style={{
              backgroundColor: '#F7FCFC',
              margin: '10px',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <h1>{survey.title}</h1>
            <h4>www.survey.com/{survey.customSlug}</h4>
          </div>
          {questions.map((question) => {
            return (
              <div>
                <EditQuestionComponent
                  question={question}
                  surveyId={survey.id}
                />
              </div>
            );
          })}

          <AddQuestionComponent survey={survey} />
          <div
            style={{
              // backgroundColor: '#F7FCFC',
              margin: '10px 10px',
              padding: '0px 0px',
              borderRadius: '10px',
            }}
          >
            {user.id === 1 ? (
              // <div>
              //   <button
              //     onClick={(e) => {
              //       window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
              //     }}
              //   >
              //     preview
              //   </button>
              <button
                style={{ width: '100%' }}
                onClick={(e) => {
                  window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
                }}
              >
                create survey
              </button>
            ) : (
              // <button
              //   onClick={(e) => {
              //     window.location.href = `/signup?returnTo=login?returnTo=${slug}/edit`;
              //   }}
              // >
              //   publish
              // </button>
              // </div>
              <div>
                <button
                  style={{
                    backgroundColor: '#C1BFBF',
                    color: '#F7FCFC',
                    fontWeight: '650',
                    marginRight: '20px',
                  }}
                  onClick={(e) => {
                    window.location.href = `/user/${username}`;
                  }}
                >
                  RETURN
                </button>
                <button
                  style={{
                    color: '#F7FCFC',
                    fontWeight: '650',
                  }}
                  onClick={(e) => {
                    window.location.href = `/${slug}`;
                  }}
                >
                  VIEW SURVEY
                </button>
                {/* <button
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
              </button> */}
              </div>
            )}
          </div>
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

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout';
import { getQuestionWhereSurveyIdIs,getSurveysByUserId } from '../util/database';

export default function dashboard(props) {

  const user = props.user
  return (
    <Layout username = {user.username}>
      <h2>Welcome {user.username}!</h2>
      <div>
        <h3>UX Workshop</h3>
        <p>status: published</p>
        <p>responses:10</p>
        <button
          onClick={(e) => {
            window.location.href = '/results';
          }}
        >
          results
        </button>
        <button>share</button>
        <button
          onClick={(e) => {
            window.location.href = '/new';
          }}
        >
          edit
        </button>
        <button>delete</button>
      </div>
      <div>
        <h3>UX 101</h3>
        <p>status: draft</p>
        <p>responses:0</p>
        <button>edit</button>
        <button>delete</button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const username = context.query.username;
  console.log(context.query)
  const { getUserByUsername } = await import('../util/database');
  const user = await getUserByUsername(username);
  console.log('getting user by username', user);
  user.createdAt = JSON.stringify(user.createdAt);
  const surveys = await getSurveysByUserId(user.id)
  // surveys[0].createdAt = JSON.stringify(survey.createdAt);
  console.log('gettingsurveys by userid', surveys);

  const questions = await getQuestionWhereSurveyIdIs(surveys[0].id);
  console.log('gettingquestions by surveyid:', surveys[0].id, questions);

  // const serializedSurveys = surveys.map((survey)=>JSON.stringify(survey.createdAt));
  // console.log('serialozedSurveys', serializedSurveys)

  const props = {surveys:surveys};
  if (user) props.user = user;
  return {
    props: {user:user},
  };
}
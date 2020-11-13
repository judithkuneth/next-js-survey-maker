/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout';
// import {
//   getQuestionWhereSurveyIdIs,
//   getSurveysByUserId,
// } from '../util/database';

export default function dashboard(props) {
  const user = props.user;
  const surveys = props.surveys;
  const dummySurvey = props.dummySurvey;
  if (dummySurvey)
    var surveyList = dummySurvey.map((dummy) => {
      return (
        <div>
          <h2>{dummy.title}</h2>
          draft
          <br />
          responses: TODO
          <br />
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
          <br />
          <br />
          <button
            onClick={(e) => {
              window.location.href = '/new';
            }}
          >
            + Create New Survey
          </button>
        </div>
      );
    });
  else
    var surveyList = surveys.map((survey) => {
      function checkStatus() {
        if (survey.published === false) return 'draft';
        else return 'published';
      }
      return (
        <div>
          <h2>{survey.title}</h2>
          <p>{checkStatus()}</p>
          <p>responses: 0</p>
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
              window.location.href = `/s/${survey.id}`;
            }}
          >
            edit
          </button>
          {/*TODO: Refresh onclick*/}
          <button
            onClick={async (e) => {
              const response = await fetch('/api/deletesurvey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: survey.id,
                }),
              });
            }}
          >
            delete
          </button>
          <br />
          <br />
          <br />

          <button
            onClick={(e) => {
              window.location.href = '/new';
            }}
          >
            + Create New Survey
          </button>
        </div>
      );
    });
  console.log('fuckin f´surveys', surveys);
  return (
    <Layout username={user.username}>
      <h2>Welcome {user.username}!</h2>
      <div>
        <h3>Here are your surveys:</h3>
        <h2>{surveyList}</h2>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const username = context.query.username;
  console.log(context.query);
  const { getUserByUsername } = await import('../util/database');
  const user = await getUserByUsername(username);
  console.log('getting user by username', user);
  user.createdAt = JSON.stringify(user.createdAt);
  const { getSurveysByUserId } = await import('../util/database');
  const dummySurvey = await getSurveysByUserId(user.id);

  if (dummySurvey[0].id === 0) {
    console.log('check if dummySurvey[0]===0', dummySurvey[0] === 0);
    return { props: { dummySurvey, user } };
    // const questions = await getQuestionWhereSurveyIdIs(surveys[0].id);
    // console.log('gettingquestions by surveyid:', surveys[0].id, questions);
    // return { props: { user: user } };
  }

  // const serializedSurveys = surveys.map((survey)=>JSON.stringify(survey.createdAt));
  // console.log('serialozedSurveys', serializedSurveys)

  // const props = { surveys: surveys };
  // if (user) props.user = user;
  const surveys = await getSurveysByUserId(user.id);
  // surveys[0].createdAt = JSON.stringify(survey.createdAt);
  console.log('surveys in sreverside ', surveys);

  return {
    props: { user: user, surveys: surveys },
  };
}

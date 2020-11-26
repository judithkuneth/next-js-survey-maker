/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import Link from 'next/link';
import { isTokenValid } from '../../util/auth';

const formStyles = css`
display: flex;
  flex-direction: column;
  // align-items: center;
  align-items: center;
  h1{color:#767474;}
form{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 50px;
  background-color: #f7fcfc;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 80%;
  max-width:500px;
  h2{margin: 60px 0px 20px 0px}
  button{
    width: 100%;
    margin-top:50px;
    border-color: #f7fcfc;
    font-size: 16px;
    font-weight: 500;
    color:#f7fcfc;
  }
  
  // algn-self: center;}
`;

const QuestionStyles = css`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // margin: 10px;
  input {
    width: 100%;
  }
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    // margin-top: 20px;
  }
`;

export default function slug(props) {
  const slug = props.slug;
  const survey = props.survey;
  const loggedIn = props.loggedIn;

  if (!props.questions) {
    if (loggedIn) {
      return (
        <Layout username={props.user.username}>
          <h3 style={{ color: '#d5d4d4' }}>Oops..This page does not exist</h3>
        </Layout>
      );
    } else
      return (
        <Layout>
          <h3 style={{ color: '#d5d4d4' }}>Oops..This page does not exist</h3>
        </Layout>
      );
    const questions = props.questions;
  }
  const questions = props.questions;

  const defaultValues = questions.map((question) => {
    return {
      questionId: question.id,
      responseValue: Math.ceil(
        (question.valueMax - question.valueMin) / 2 + question.valueMin,
      ),
    };
  });
  console.log('default values', defaultValues);
  // console.log(document.getElementById(86).value);

  const [responseValues, setResponseValues] = useState(
    defaultValues,
    //   [
    //   { questionId: 60, responseValue: 5 },
    //   { questionId: 61, responseValue: -10 },
    //   { questionId: 62, responseValue: 1 },
    // ]
  );

  function updateResponseValues(questionId, responseValue) {
    const newResponseValues = responseValues.map((response) => {
      if (questionId === response.questionId) {
        return {
          questionId: response.questionId,
          responseValue: responseValue,
        };
      }
      return response;
    });
    // const index = responseValues.findIndex(
    //   (response) => questionId === response.questionId,
    // );

    // const newResponseValues = [...responseValues];
    // newResponseValues[index] = {
    //   ...newResponseValues[index],
    //   responseValue: responseValue,
    // };

    console.log('newResponseValues', newResponseValues);

    return setResponseValues(newResponseValues);
  }

  const listOfQuestions = questions.map((question) => {
    return (
      <div css={QuestionStyles}>
        <h2>{question.title}</h2>

        <input
          onChange={(e) => {
            updateResponseValues(question.id, Number(e.currentTarget.value));

            // console.log(
            //   'update response with id',
            //   question.id,
            //   'current value',
            //   e.currentTarget.value,
            // );
          }}
          type="range"
          min={`${question.valueMin}`}
          max={`${question.valueMax}`}
          id={`${question.id}`}
          name={`${question.title}`}
          value={
            responseValues.find((r) => r.questionId === question.id)
              .responseValue
          }
        ></input>
        <div>
          <div>
            {question.descriptionMin}({question.valueMin})
          </div>
          <div>
            {question.descriptionMax}({question.valueMax})
          </div>
        </div>
      </div>
    );
  });

  // const getResponses = questions.map(
  //   (question) => question.id,
  //   document.getElementById(`${question.id}`).value,
  // );

  if (loggedIn) {
    return (
      <Layout username={props.user.username}>
        <div css={formStyles}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await fetch('/api/addresponse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  responseValues: responseValues,
                }),
              });
            }}
          >
            <h1>{survey.title}</h1>
            {listOfQuestions}
            <button>SUBMIT</button>
          </form>
        </div>
      </Layout>
    );
  } else
    return (
      <Layout>
        <div css={formStyles}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await fetch('/api/addresponse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  responseValues: responseValues,
                }),
              });
            }}
          >
            <h1>{survey.title}</h1>
            {listOfQuestions}
            <button>SUBMIT</button>
          </form>
        </div>
      </Layout>
    );
}

//   return (
//     <Layout username={props.user.username}>
//       <p>www.surveymaker.com/{slug}</p>
//       <form
//         onSubmit={async (e) => {
//           e.preventDefault();
//           const response = await fetch('/api/addresponse', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               responseValues: responseValues,
//             }),
//           });
//         }}
//       >
//         {listOfQuestions}
//         <button>Submit</button>
//       </form>
//     </Layout>
//   );
// }

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const { session } = nextCookies(context);

  const { getSurveyBySlug } = await import('../../util/database');
  const survey = await getSurveyBySlug(slug);

  console.log('check', await isTokenValid(session));

  if (survey !== undefined) {
    const { getQuestionWhereSurveyIdIs } = await import('../../util/database');
    const questions = await getQuestionWhereSurveyIdIs(survey.id);
    console.log('gettingquestions by surveyid:', questions);

    if (await isTokenValid(session)) {
      console.log('token valid');
      const { getSessionByToken } = await import('../../util/database');
      const sessionByToken = await getSessionByToken(session);
      console.log('sessionByToken', sessionByToken);

      const userId = sessionByToken.userId;
      console.log('userId', sessionByToken.userId);

      const { getUserById } = await import('../../util/database');
      const user = await getUserById(userId);
      console.log('user', user);
      user.createdAt = JSON.stringify(user.createdAt);
      return {
        props: {
          slug,
          survey,
          questions,
          user,
          loggedIn: true,
        },
      };
    }

    return {
      props: {
        slug,
        survey,
        questions,
        loggedIn: false,
      },
    };
  }
  return { props: {} };
}

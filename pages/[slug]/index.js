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
    a{font-size: 16px;
      font-weight: 520;
      color:#f7fcfc;}
  }
  
  }
`;

const QuestionStyles = css`
  display: flex;
  flex-direction: column;
  
  input {
    width: 100%;
  }
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    
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
  

  const [responseValues, setResponseValues] = useState(
    defaultValues,
    
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
    

    return setResponseValues(newResponseValues);
  }

  const listOfQuestions = questions.map((question) => {
    return (
      <div css={QuestionStyles}>
        <h2>{question.title}</h2>

        <input
          onChange={(e) => {
            updateResponseValues(question.id, Number(e.currentTarget.value));

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
            <button
              onClick={(e) => {
                window.location.href = '/thanks';
              }}
            >
              SUBMIT!
            </button>
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
            <button
              onClick={(e) => {
                window.location.href = '/thanks';
              }}
            >
              SUBMIT!
            </button>
          </form>
        </div>
      </Layout>
    );
}



export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const { session } = nextCookies(context);

  const { getSurveyBySlug } = await import('../../util/database');
  const survey = await getSurveyBySlug(slug);


  if (survey !== undefined) {
    const { getQuestionWhereSurveyIdIs } = await import('../../util/database');
    const questions = await getQuestionWhereSurveyIdIs(survey.id);
  

    if (await isTokenValid(session)) {
      
      const { getSessionByToken } = await import('../../util/database');
      const sessionByToken = await getSessionByToken(session);
      

      const userId = sessionByToken.userId;
     

      const { getUserById } = await import('../../util/database');
      const user = await getUserById(userId);
   
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

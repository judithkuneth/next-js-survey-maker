import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import Link from 'next/link';
import { isTokenValid } from '../../util/auth';

export default function slug(props) {
  const slug = props.slug;
  const survey = props.survey;

  if (!props.questions)
    return (
      <Layout username={props.user.username}>
        <h1>This page does not exists</h1>
        <br />
        <Link href="../login">
          <button> Login</button>
        </Link>
      </Layout>
    );

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
      <div>
        <h2>{question.title}</h2>
        <br />
        <br />
        {question.descriptionMin}({question.valueMin})
        <input
          onChange={(e) => {
            updateResponseValues(question.id, Number(e.currentTarget.value));

            console.log(
              'update response with id',
              question.id,
              'current value',
              e.currentTarget.value,
            );
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
          // defaultValue={`${question.valueMin}`}
        ></input>
        {question.descriptionMax}({question.valueMax})
        <br />
        <br />
        <input />
      </div>
    );
  });

  // const getResponses = questions.map(
  //   (question) => question.id,
  //   document.getElementById(`${question.id}`).value,
  // );

  return (
    <Layout username={props.user.username}>
      <p>www.surveymaker.com/{slug}</p>
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
        {listOfQuestions}
        <button>Submit</button>
      </form>
    </Layout>
  );
}

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
        },
      };
    }

    return {
      props: {
        slug,
        survey,
        questions,
      },
    };
  }
  return { props: {} };
}

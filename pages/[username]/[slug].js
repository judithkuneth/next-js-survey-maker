import Layout from '../../components/Layout';

import { useState } from 'react';
// import nextCookies from 'next-cookies';
// import Link from 'next/link';

export default function slug(props) {
  const slug = props.slug;
  const survey = props.survey;
  const questions = props.questions;

  const questionIds = questions.map((question) => {
    return { questionId: question.id, responseValue: 0 };
  });
  console.log('new array: questionIds', questionIds);

  const [responseValues, setResponseValues] = useState(
    questionIds,
    //   [
    //   { questionId: 60, responseValue: 5 },
    //   { questionId: 61, responseValue: -10 },
    //   { questionId: 62, responseValue: 1 },
    // ]
  );

  console.log('responseValues', responseValues);

  function updateResponseValues(questionId, responseValue) {
    // console.log(
    //   'update response of questionId',
    //   questionId,
    //   'with value',
    //   responseValue,
    // );

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
        <select name="questionType" id="questionType">
          <option value="x_slider">x slider</option>
          <option value="y_slider">y slider</option>
          <option value="gauge">gauge</option>
          <option value="binary">gwo Buttons</option>
        </select>
        <br />
        {question.descriptionMin}({question.valueMin})
        <input
          onChange={(e) => {
            updateResponseValues(
              question.id,
              Number(e.currentTarget.value),
              // document.getElementById(question.id).value,
            );
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
        ></input>
        {question.descriptionMax}({question.valueMax})
        <br />
        <br />
      </div>
    );
  });

  // const getResponses = questions.map(
  //   (question) => question.id,
  //   document.getElementById(`${question.id}`).value,
  // );

  return (
    <Layout>
      <p>www.surveymaker.com/{slug}</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/insertresponse', {
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
  const { getSurveyBySlug } = await import('../../util/database');
  const survey = await getSurveyBySlug(slug);
  const { getQuestionWhereSurveyIdIs } = await import('../../util/database');
  const questions = await getQuestionWhereSurveyIdIs(survey.id);
  console.log('gettingquestions by surveyid:', questions);
  return {
    props: {
      slug,
      survey,
      questions,
    },
  };
}

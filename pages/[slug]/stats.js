/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/core';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import { isTokenValid } from '../../util/auth';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useState } from 'react';
import BarChartComponent from '../../components/BarChartComponent';

export default function stats(props) {
  const survey = props.survey;
  const questions = props.questions;
  // questions = [{id:65, surveyId:1, itemorder: 0, questionType: 'x_slider',title:'dwda', valueMin: 1, valueMax: 2, descriptionMin: 'aw',descriptionMax: 'wwea'}{...}]
  const responses = props.responses;
  // responses = [
  //[
  //  {id: 24, questionId:65, responseValue:0},{...},{...},
  //]
  // [
  // {...},{...},{...}
  // ]
  //]

  const responsesSimplified = responses[0].concat(responses[1]);
  console.log('simplified.lenght', responsesSimplified.length);

  //const questionAndResponses = [{id:65,surveyId:1, ....., responses:{id:24, responseValue:0}}]

  // --------------- find out whats going on here!! ---------------
  // const newQuestions = questions.map((question) => {
  //   const newQuestionsArray = responsesSimplified.map((response) => {
  //     if (response.questionId === question.id)
  //       return {
  //         title: question.title,
  //         valueMin: question.valueMin,
  //         valueMax: question.valueMax,
  //         questionIdOne: question.id,
  //         questionId: response.questionId,
  //         responseId: response.id,
  //         value: response.responseValue,
  //         results: response,
  //       };
  //   });

  //   return newQuestionsArray;
  // });

  // console.log('newQuestionsarray', newQuestions);

  // -----------------------------------------------------------------

  if (survey !== undefined) {
    return (
      <Layout>
        <h1>Stats</h1>
        {survey.title}

        <BarChartComponent questions={questions} responses={responses} />

        {questions.map((question) => {
          return (
            <div>
              <br />
              {question.title}
              <br />
              {question.valueMin}
              {question.descriptionMin}
              <input type="range"></input>
              {question.valueMax}
              {question.descriptionMay}
              <br />
            </div>
          );
        })}

        {responses[0].map((response) => {
          return (
            <div>
              <br />
              id: {response.questionId}
              <br />
              id: {response.id}
              <br />
              value: {response.responseValue}
              <br />
            </div>
          );
        })}
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>You have no access</h1>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);

  console.log('await', await isTokenValid(session));
  console.log(session);

  if (await isTokenValid(session)) {
    console.log(
      'you have access to statistsics step 1 because your token is valid',
    );
    // (session !== undefined)
    const { getSessionByToken } = await import('../../util/database');
    const sessionByToken = await getSessionByToken(session);

    const userId = sessionByToken.userId;
    console.log('session.userId', sessionByToken.userId);

    const { getUserById } = await import('../../util/database');
    const user = await getUserById(userId);
    user.createdAt = JSON.stringify(user.createdAt);

    const slug = context.query.slug;
    const { getSurveyBySlug } = await import('../../util/database');
    const survey = await getSurveyBySlug(slug);

    if (survey.userId === user.id) {
      console.log('you have access');

      const { getQuestionWhereSurveyIdIs } = await import(
        '../../util/database'
      );

      const questions = await getQuestionWhereSurveyIdIs(survey.id);

      console.log('questions', questions);

      const responsesByQuestions = await Promise.all(
        questions.map(async (id) => {
          const { getResponsesByQuestionId } = await import(
            '../../util/database'
          );
          const responses = await getResponsesByQuestionId(id.id);
          return responses;
        }),
      );

      console.log('asyncRes', responsesByQuestions);

      return {
        props: { user, survey, questions, responses: responsesByQuestions },
      };
    }

    return {
      props: {},
    };
  }
  return {
    props: {},
  };
}

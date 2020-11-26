/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import { isTokenValid } from '../../util/auth';
import BarChartComponent from '../../components/BarChartComponent';

const layoutStyles = css`
display: flex;
  flex-direction: column;
  // align-items: center;
  align-items: center;
  h1{color:#767474;margin:30px 0px}
div{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  // margin-top: 50px;
  background-color: #f7fcfc;
  border-radius: 10px;
  margin: 10px 0px;
  // padding: 20px;
  width: 90%;
  max-width: 500px;
  // max-width:500px;
  h2{margin: 0px 0px 20px 0px}
  // button{
  //   width: 100%;
  //   margin-top:50px;
  //   border-color: #f7fcfc;
  //   font-size: 16px;
  //   font-weight: 500;
  //   color:#f7fcfc;
  // }
  `;

export default function stats(props) {
  if (props.access === true) {
    const survey = props.survey;
    const questions = props.questions;
    console.log('stats.js: questions', questions);
    const responses = props.responses;
    console.log('stats.js: responses', responses);
    const responsesSimplified = responses.flat();

    console.log(
      'stats.js: simplified responses, .lenght',
      responsesSimplified,
      responsesSimplified.length,
    );

    return (
      <Layout username={props.user.username}>
        <div css={layoutStyles}>
          <div>
            <h1>{survey.title}</h1>

            {questions.map((question) => {
              return (
                <div>
                  <h2>{question.title}</h2>
                  {/* <div> */}
                  <BarChartComponent
                    question={question}
                    responses={responsesSimplified}
                  />
                  {/* </div> */}
                  {/* <br />
                  {question.valueMin}
                  {question.descriptionMin}
                  <input type="range"></input>
                  {question.valueMax}
                  {question.descriptionMay}
                  <br /> */}
                </div>
              );
            })}

            {/* {responses[0].map((response) => {
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
            })} */}
          </div>
        </div>
      </Layout>
    );
  }
  if (props.user !== undefined) {
    return (
      <Layout username={props.user.username}>
        <h3>You have no access to this page</h3>
      </Layout>
    );
  }
  return (
    <Layout>
      <h3>You have no access to this page</h3>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);

  console.log('await', await isTokenValid(session));
  console.log(session);

  if (await isTokenValid(session)) {
    console.log('token valid');
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
        props: {
          user,
          survey,
          questions,
          responses: responsesByQuestions,
          access: true,
        },
      };
    }

    return {
      props: { user, access: false },
    };
  }
  return {
    props: { access: false },
  };
}

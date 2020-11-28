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
;
  align-items: center;
  h1{color:#767474;margin:30px 0px}
div{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;

  background-color: #f7fcfc;
  border-radius: 10px;
  margin: 10px 0px;
  
  width: 90%;
  max-width: 500px;

  h2{margin: 0px 0px 20px 0px}
  
}
  `;

export default function stats(props) {
  if (props.access === true) {
    const survey = props.survey;
    const questions = props.questions;
    
    const responses = props.responses;
    
    const responsesSimplified = responses.flat();

    

    return (
      <Layout username={props.user.username}>
        <div css={layoutStyles}>
          <div>
            <h1>{survey.title}</h1>

            {questions.map((question) => {
              return (
                <div>
                  <h2>{question.title}</h2>
                
                  <BarChartComponent
                    question={question}
                    responses={responsesSimplified}
                  />
                  
                </div>
              );
            })}

            
          </div>
        </div>
      </Layout>
    );
  }
  if (props.user !== undefined) {
    return (
      <Layout username={props.user.username}>
        <h3 style={{ color: '#f7fcfc' }}>
          Sorry you have no access to this page.
        </h3>
      </Layout>
    );
  }
  return (
    <Layout>
      <h3 style={{ color: '#f7fcfc' }}>
        Sorry you have no access to this page.
      </h3>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);

  

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

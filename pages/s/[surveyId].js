/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import EditQuestionComponent from '../../components/EditQuestionComponent';
import Layout from '../../components/Layout';

import cookie from 'js-cookie'
// import { getQuestionWhereSurveyIdIs,getSurveysByUserId } from '../../util/database';

export default function dashboard(props) {
  
const username = cookie.getJSON('username')
console.log('username', username)
// console.log('get cookie username', cookie.get.JSON('username'))
  const surveyId = props.surveyId
  const questions = props.questions
  
  return (
    <Layout username = {username}>
      <h2>This id Survey ID {surveyId}!</h2>
      <div>{questions.map((question)=>{return <div>{question.title}
      <EditQuestionComponent question = {question} surveyId = {surveyId}/>
      </div>
})}</div>
    </Layout>
    
  );
}

export async function getServerSideProps(context) {
  
  const surveyId = context.query.surveyId;
  console.log('query', context.query)

const { getQuestionWhereSurveyIdIs } = await import('../../util/database');
  const questions = await getQuestionWhereSurveyIdIs(surveyId);
  console.log('gettingquestions by surveyid:', surveyId, questions);

 
  return {
    props: {surveyId, questions},
  };
}


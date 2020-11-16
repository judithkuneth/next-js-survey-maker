import Layout from '../../components/Layout';
import questions from '../questions';
// import nextCookies from 'next-cookies';
// import Link from 'next/link';

export default function slug(props) {
  const slug = props.slug;
  const survey = props.survey;
  const questions = props.questions;

  const map = questions.map((question) => {
    return (
      <div>
        title: {question.title}
        <br />
        id: {question.id}
        <br />
        type: {question.questionType}
        <br />
        valueMin: {question.valueMin}
        <br />
        descriptionMin: {question.descriptionMin}
        <br />
        valueMax: {question.valueMax}
        <br />
        descriptionMax: {question.descriptionMax}
        <br />
        <br />
      </div>
    );
  });

  return (
    <Layout>
      <h1>Take this survey {survey.title} </h1>
      <p>www.surveymaker.com/{slug}</p>
      <p>Questions: {map};</p>
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

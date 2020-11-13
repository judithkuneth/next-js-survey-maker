/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import Questions from '../components/Questions';
import QuestionComponent from '../components/QuestionComponent';
import EditQuestionComponent from '../components/EditQuestionComponent';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';

const mainStyles = css`
  background: blue;
`;

export default function New(props) {
  const username = cookie.getJSON('username');
  const user = props.user;
  // const username = user.username;
  const [title, setTitle] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const router = useRouter();

  return (
    //TODO input URL: make sure no spaces allowed
    <React.Fragment>
      <Layout username={username} css={mainStyles}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch('/api/new', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.id,
                title: title,
                customSlug: customSlug,
              }),
            });
          }}
        >
          <br />
          <br />
          <br />
          <input
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            placeholder="My first Survey"
          ></input>
          <br />
          <br />
          www.survey.com/
          <input
            placeholder="custom-slug"
            onChange={(e) => {
              setCustomSlug(e.currentTarget.value);
            }}
          />
          <br />
          <button
            onClick={(e) => {
              window.location.href = `/${user.username}`;
            }}
          >
            Create survey
          </button>
        </form>
        {/* <Link href="/questions">
          <button>+ Add Questions</button>
        </Link>
        <br />
        <br />
        <br /> */}

        {/* -----------------------preview----------------------------------------------------
        <h1>{title}</h1>
        www.survey.com/{customSlug} */}
        {/* <QuestionComponent /> */}
        {/* <EditQuestionComponent/> */}
        {/* <Link href="/signup">
          <button>Save This</button>
        </Link>
        <Link href="/signup">
          <button>Publish</button>
        </Link> */}
      </Layout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const { username } = nextCookies(context);
  console.log('username from context', username);
  // console.log('username from context', username);
  const { getUserByUsername } = await import('../util/database');
  const user = await getUserByUsername(username);
  user.createdAt = JSON.stringify(user.createdAt);
  console.log('user log', user);

  // const user = await getUserByUsername(username);
  // console.log('getting user by username', user);

  // const surveys = await getSurveysByUserId(user.id)
  // // surveys[0].createdAt = JSON.stringify(survey.createdAt);
  // console.log('gettingsurveys by userid', surveys);

  // const questions = await getQuestionWhereSurveyIdIs(surveys[0].id);
  // console.log('gettingquestions by surveyid:', surveys[0].id, questions);

  // const props = {surveys:surveys};
  // if (user) props.user = user;
  // return {
  //   props: {user:user},
  // };
  return { props: { user } };
}

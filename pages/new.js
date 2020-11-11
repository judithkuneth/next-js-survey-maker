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
import cookie from 'js-cookie'

const mainStyles = css`
  background: blue;
`;

export default function New() {
  const username = cookie.getJSON('username')
  const [title, setTitle] = useState('');
  const [customSlug, setCustomSlug] = useState('');
    const router = useRouter();

  return (
    //TODO input URL: make sure no spaces allowed
    <React.Fragment>
      <Layout username = {username}css={mainStyles}>
        <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: 5,
              title: title,
              customSlug: customSlug
            }),
          })}}
          >
            <h3>Add a Title</h3>
        <input
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          placeholder="My first Survey"
        ></input>
            <h3>Customize your URL</h3>
        www.survey.com/
        <input
          placeholder="custom-slug"
          onChange={(e) => {
            setCustomSlug(e.currentTarget.value);
          }}
        />
          <button>Create survey</button>
        </form>
        <Link href="/questions">
          
            <button>+ Add Questions</button>
          
        </Link>
        <br />
        <br />
        <br />
        -----------------------preview----------------------------------------------------
        <h1>{title}</h1>
        www.survey.com/{customSlug}
        <QuestionComponent/>
        {/* <EditQuestionComponent/> */}
        <Link href="/signup">
       
            <button>
              Save Draft
            </button>
       
        </Link>
        <Link href="/signup">
         
            <button>
             Publish
            </button>
        
        </Link>
      </Layout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
 
  // const { getUserByUsername } = await import('../util/database');
  // const user = await getUserByUsername(username);
  // console.log('getting user by username', user);
  // user.createdAt = JSON.stringify(user.createdAt);
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
  return {props:{}}
}
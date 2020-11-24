/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import Link from 'next/link';
import { useState } from 'react';
// import {
//   getQuestionWhereSurveyIdIs,
//   getSurveysByUserId,
// } from '../util/database';

export default function dashboard(props) {
  const user = props.user;
  const surveys = props.surveys;
  const dummySurvey = props.dummySurvey;
  const potentialUser = props.potentialUser;

  function copyToClipBoard(slug) {
    navigator.clipboard.writeText(`http://localhost:3000/${slug}`);

    /* Alert the copied text */
    alert('Copied the text: ' + `http://localhost:3000/${slug}`);
  }
  if (!props.user)
    return (
      <Layout>
        <h1>
          You are trying to access {potentialUser}'s dashboard but you are not
          logged in. Please login to get access{' '}
        </h1>
        <br />
        <Link href="../login">
          <button> Login</button>
        </Link>
      </Layout>
    );
  if (dummySurvey)
    var surveyList = dummySurvey.map((dummy) => {
      return (
        <div>
          <h2>{dummy.title}</h2>
          draft
          <br />
          responses: TODO
          <br />
          <button
            onClick={(e) => {
              window.location.href = '/results';
            }}
          >
            results
          </button>
          <button>share</button>
          <button
            onClick={(e) => {
              window.location.href = '/new';
            }}
          >
            edit
          </button>
          <button>delete</button>
          <br />
          <br />
          <button
            onClick={(e) => {
              window.location.href = '/new';
            }}
          >
            + Create New Survey
          </button>
        </div>
      );
    });
  else
    var surveyList = surveys.map((survey) => {
      function checkStatus() {
        if (survey.published === false) return 'draft';
        else return 'published';
      }
      return (
        <div>
          <input id="myInput" />
          <h2>{survey.title}</h2>
          <p>{checkStatus()}</p>
          <p>responses: 0</p>
          <button
            onClick={(e) => {
              window.location.href = `/${survey.customSlug}/stats`;
            }}
          >
            results
          </button>
          <button
            onClick={(e) => {
              copyToClipBoard(survey.customSlug);
              // navigator.clipboard.writeText(
              //   `http://localhost:3000/${survey.customSlug}`,
              // );
              // console.log('survey.customSlug', survey.customSlug);
              // copyToClipBoard(survey.customSlug);
            }}
          >
            share
          </button>
          <button
            onClick={(e) => {
              window.location.href = `/${survey.customSlug}/edit`;
            }}
          >
            edit
          </button>
          {/*TODO: Refresh onclick*/}
          <button
            onClick={async (e) => {
              const response = await fetch('/api/deletesurvey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: survey.id,
                }),
              });
            }}
          >
            delete
          </button>
          <button
            onClick={(e) => {
              window.location.href = `/${survey.customSlug}`;
            }}
          >
            publish
          </button>
          <br />
          <br />
          <br />

          <button
            onClick={(e) => {
              window.location.href = '/new';
            }}
          >
            + Create New Survey
          </button>
        </div>
      );
    });
  console.log('fuckin f´surveys', surveys);
  return (
    <Layout username={user.username}>
      <h2>Welcome {user.username}!</h2>
      <div>
        <h3>Here are your surveys:</h3>
        <h2>{surveyList}</h2>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);
  const { getSessionByToken } = await import('../../util/database');
  const potentialUser = context.query.username;

  if (session !== undefined) {
    const sessionByToken = await getSessionByToken(session);
    const userId = sessionByToken.userId;
    console.log('session.userId', sessionByToken.userId);
    const { getUserById } = await import('../../util/database');
    const user = await getUserById(userId);
    user.createdAt = JSON.stringify(user.createdAt);

    const { getSurveysByUserId } = await import('../../util/database');
    const dummySurvey = await getSurveysByUserId(user.id);

    if (dummySurvey[0].id === 0) {
      console.log('check if dummySurvey[0]===0', dummySurvey[0] === 0);
      return { props: { dummySurvey, user } };
    }

    const surveys = await getSurveysByUserId(user.id);

    return {
      props: { user: user, surveys: surveys },
    };
  }
  return { props: { potentialUser: potentialUser } };
}

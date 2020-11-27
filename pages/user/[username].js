/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../../components/Layout';
import nextCookies from 'next-cookies';
import Link from 'next/link';
import { useState } from 'react';
import { set } from 'js-cookie';
// import {
//   getQuestionWhereSurveyIdIs,
//   getSurveysByUserId,
// } from '../util/database';

const dashboardStyles = css`
  display: flex;
  flex-direction: column;
  margin: 30px 10px;
  align-items: center;

  h3 {
    color: #d5d4d4;
    font-weight: 350;
    font-size: 24px;
  }
  button {
    color: #f7fcfc;
    width: 90%;
  }
`;

const surveyStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  // justify-content: center;
  margin: 20px 0px;
  padding: 10px;
  background-color: #f7fcfc;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  h1 {
    margin-bottom: 5px;
  }
  div {
    margin: 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // align-items: center;
    max-width: 500px;
    width: 100%;
    a {
      color: #878787;
      background-color: #e9ebeb;
      width: 100%;
      display: flex;
      align-items: center;
      border-radius: 10px;
      padding: 5px 10px;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        display: flex;
        flex-direction: row;
        //
        justify-content: flex-start;
        width: 90%;
        h2 {
          margin-right: 4px;
        }
        p {
          color: #878787;
        }
      }
    }
  }
`;

export default function dashboard(props) {
  const user = props.user;
  const surveys = props.surveys;
  const dummySurvey = props.dummySurvey;
  const potentialUser = props.potentialUser;

  const [linkCopied, setLinkCopied] = useState('');

  function copyToClipBoard(slug) {
    navigator.clipboard.writeText(`https://myquicksy.herokuapp.com/${slug}`);
    setLinkCopied('copied to clipboard');
    setTimeout(world, 5000);
    function world() {
      setLinkCopied(``);
    }

    /* Alert the copied text */
    // alert(
    //   'Copied the link: ' +
    //   <a href={`{https://myquicksy.herokuapp.com/${slug}}`}></a>,
    // );
    // alert(
    //   'Copied the text: ' +
    //   <a href="">`https://myquicksy.herokuapp.com/${slug}`</a>,
    // );
  }
  if (!props.user)
    return (
      <Layout>
        <h3 style={{ color: '#f7fcfc' }}>You have no access to this page.</h3>
      </Layout>
    );
  if (dummySurvey)
    var surveyList = dummySurvey.map((dummy) => {
      return (
        <div>
          {/* <button
            onClick={(e) => {
              window.location.href = '/new';
            }}
          >
            + NEW SURVEY
          </button> */}
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
        <div css={surveyStyles}>
          <h1>{survey.title}</h1>
          {/* <p>{checkStatus()}</p> */}
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#e9ebeb',
              borderRadius: '10px',
            }}
          >
            <Link href={`/${survey.customSlug}`}>
              <a target="_blank">myquicksy.com/{survey.customSlug}</a>
            </Link>

            <button
              style={{
                backgroundColor: '#C1BFBF',
                color: '#767474',
                fontSize: '18px',
                padding: '5px',
                height: '30px',
                width: '70px',
                fontSize: '18px',
                // marginTop: '10px',
              }}
              onClick={(e) => {
                copyToClipBoard(survey.customSlug);
                // navigator.clipboard.writeText(
                //   `http://localhost:3000/${survey.customSlug}`,
                // );
                // console.log('survey.customSlug', survey.customSlug);
                // copyToClipBoard(survey.customSlug);
              }}
            >
              copy
            </button>
          </div>
          <div>
            <div>
              <div>
                <h2>0</h2>
                <p>questions</p>
              </div>
              <button
                style={{
                  backgroundColor: '#C1BFBF',
                  color: '#F7FCFC',
                  fontSize: '18px',
                  padding: '2px',
                  height: '38px',
                  marginTop: '10px',
                }}
                onClick={(e) => {
                  window.location.href = `/${survey.customSlug}/edit`;
                }}
              >
                edit
              </button>
            </div>
            <div>
              {/*TODO: Refresh onclick*/}

              {/* <button
            onClick={(e) => {
              window.location.href = `/${survey.customSlug}`;
            }}
          >
            publish
          </button> */}

              {/* <div> */}
              <div>
                <h2>0</h2>
                <p>responses</p>
              </div>
              <button
                style={{
                  color: '#F7FCFC',
                  fontSize: '18px',
                  padding: '2px',
                  height: '38px',
                  marginTop: '10px',
                }}
                onClick={(e) => {
                  window.location.href = `/${survey.customSlug}/stats`;
                }}
              >
                see results
              </button>
              {/* </div> */}
            </div>
          </div>
          {/* <button
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
          </button> */}
        </div>
      );
    });
  console.log('fuckin f´surveys', surveys);
  return (
    <Layout username={user.username}>
      <div css={dashboardStyles}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h3>Welcome {user.username}!</h3>
          <p style={{ color: '#f7fcfc' }}>{linkCopied}</p>
        </div>
        <button
          style={{
            width: '90%',
            color: '#30cdcd',
            borderStyle: 'solid',
            borderColor: '#30cdcd',
            backgroundColor: '#f7fcfc',
            fontSsize: '16px',
            fontWeight: '550',
            marginTop: '20px',
          }}
          onClick={(e) => {
            window.location.href = '/new';
          }}
        >
          + NEW QUICKSY
        </button>
        {surveyList}
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

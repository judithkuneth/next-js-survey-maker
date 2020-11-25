/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';

import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';
import { isTokenValid } from '../util/auth';

const componentStyles = css`
  display: flex;
  flex-direction: row;
  // flex-wrap: wrap;
  justify-content: center;
  margin: 10px;
  // width: 200px;

  form {
    // width: 266px;
    height: 220px;
    background-color: #f7fcfc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    padding-left: 20px;
    padding: 20px;
    justify-content: space-evenly;
    border-style: solid;
    border-width: 3px;
    border-color: #30cdcd;

    input {
      // border-top-style: hidden;
      // border-right-style: hidden;
      // border-left-style: hidden;
      // border-bottom-style: solid;
      // border-radius: 0px;
      // border-color: #c1bfbf;
      width: 100%;
    }

    button {
      width: 100%;
      color: #f7fcfc;
      font-size: 16px;
      font-weight: 550;
      border: none;
    }
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      p {
        margin-top: 5px;
      }
      input {
        font-size: 13px;
        width: 150px;
        height: 20px;
        // padding: 0px;
      }
    }
  }
`;

export default function New(props) {
  const username = cookie.getJSON('username');
  const user = props.user;
  const [errorMessage, setErrorMessage] = useState('');

  // const username = user.username;
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const router = useRouter();
  if (user.id !== 1) {
    return (
      //TODO input URL: make sure no spaces allowed
      <React.Fragment>
        <Layout username={username}>
          <div css={componentStyles}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await fetch('/api/new', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: user.id,
                    title: title,
                    customSlug: slug,
                  }),
                });
                const { success } = await response.json();
                if (success) {
                  router.push(`/${slug}/edit`);
                } else {
                  if (response.status === 403) {
                    setErrorMessage('Slug not available!');
                  } else setErrorMessage('That Failed!');
                }
              }}
            >
              <input
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
                placeholder="My first Survey"
              ></input>
              <div>
                <p>www.survey.com/</p>
                <input
                  placeholder="custom-slug"
                  onChange={(e) => {
                    setSlug(e.currentTarget.value);
                  }}
                />
              </div>

              <button

              //   onClick={(e) => {
              //     window.location.href = `/${slug}/edit`;
              //   }
              // }
              >
                CREATE SURVEY
              </button>
            </form>
          </div>
          {errorMessage}
        </Layout>
      </React.Fragment>
    );
  }
  return (
    <Layout username={username}>
      You are not logged in
      <div css={componentStyles}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch('/api/addsurvey', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.id,
                title: title,
                customSlug: slug,
              }),
            });
            const { success } = await response.json();
            if (success) {
              router.push(`/${slug}/edit`);
            } else {
              if (response.status === 403) {
                setErrorMessage('Slug already in use. Try another one!');
              } else setErrorMessage('That Failed!');
            }
          }}
        >
          <input
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            placeholder="My first Survey"
          ></input>

          <div>
            <p>www.survey.com/</p>
            <input
              placeholder="custom-slug"
              onChange={(e) => {
                setSlug(e.currentTarget.value);
              }}
            />
          </div>

          <button

          // onClick={(e) => {
          //   window.location.href = `/${slug}/edit`;
          // }}
          >
            CREATE SURVEY
          </button>
        </form>
      </div>
      {errorMessage}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);
  const { getSessionByToken } = await import('../util/database');

  if (await isTokenValid(session)) {
    console.log('token valid');

    const sessionByToken = await getSessionByToken(session);

    const userId = sessionByToken.userId;
    console.log('userId', sessionByToken.userId);

    const { getUserById } = await import('../util/database');
    const user = await getUserById(userId);
    user.createdAt = JSON.stringify(user.createdAt);

    return { props: { user } };
  }

  const dummyUser = { id: 1 };
  return { props: { user: dummyUser } };
}

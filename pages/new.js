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

const mainStyles = css`
  background: blue;
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
        <Layout username={username} css={mainStyles}>
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
                  setErrorMessage('Slug not available!');
                } else setErrorMessage('That Failed!');
              }
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
                setSlug(e.currentTarget.value);
              }}
            />
            <br />
            <button
            //   onClick={(e) => {
            //     window.location.href = `/${slug}/edit`;
            //   }
            // }
            >
              Create survey
            </button>
          </form>
          {errorMessage}
        </Layout>
      </React.Fragment>
    );
  }
  return (
    <Layout username={username} css={mainStyles}>
      You are not logged in
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
            setSlug(e.currentTarget.value);
          }}
        />
        <br />
        <button
        // onClick={(e) => {
        //   window.location.href = `/${slug}/edit`;
        // }}
        >
          Create survey
        </button>
      </form>
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

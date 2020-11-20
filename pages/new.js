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
  // const username = user.username;
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const router = useRouter();
  // if (user.id !== 0) {
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
                customSlug: slug,
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
              setSlug(e.currentTarget.value);
            }}
          />
          <br />
          <button
            onClick={(e) => {
              window.location.href = `/${slug}/edit`;
            }}
          >
            Create survey
          </button>
        </form>
      </Layout>
    </React.Fragment>
  );
  // }
  // return <Layout>Hello World</Layout>;
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

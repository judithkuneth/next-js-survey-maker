/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout.js';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { isTokenValid } from '../util/auth';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';

export default function Login(props: { redirectDestination: string }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // console.log('redirect in login', props.redirectDestination);
  // console.log(
  //   'redirect in login split',
  //   props.redirectDestination.split('/')[0],
  // );

  function redirectSlug() {
    if (props.redirectDestination !== '/') {
      let redSlug = props.redirectDestination.split('/')[0];
      return redSlug;
    } else return '';
  }
  console.log('redirect destination in login wojho', props.redirectDestination);
  console.log('redirectSlug()', redirectSlug());

  return (
    <Layout>
      <h1>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/loginandupdate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username,
              password,
              redirectSlug: redirectSlug(),
            }),
          });

          const { success } = await response.json();
          if (success) {
            setErrorMessage('');
            cookie.set('username', `${username}`);
            router.push(`/user/${username}`);
          }

          // if (!success) {
          //   setErrorMessage('Login failed');
          // }
          else {
            //   console.log('successfully logedin');
            setErrorMessage('Login failed');
            //   cookie.set('username', `${username}`);
            //   if (
            //     props.redirectDestination !== undefined &&
            //     props.redirectDestination !== ''
            //   ) {
            //     router.push(`/${props.redirectDestination}`);
            //   } else {
            //     router.push(`/user/${username}`);
            //   }
          }
        }}
      >
        <p>Email</p>
        <input type="email"></input>
        or
        <p>Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></input>
        <button>Login</button>
        <br />
        <a href="/signup">New user? Signup here</a>
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session, username } = nextCookies(context);
  const redirectDestination = context?.query?.returnTo ?? '/';
  if (session !== undefined) {
    const { getSessionByToken } = await import('../util/database');
    const sessionByToken = await getSessionByToken(session);
    const userId = sessionByToken.userId;
    console.log('session.userId', sessionByToken.userId);
    const { getUserById } = await import('../util/database');
    const user = await getUserById(userId);
    const username = user.username;
    // user.createdAt = JSON.stringify(user.createdAt);

    console.log('redirectDestination', redirectDestination);

    if (await isTokenValid(session)) {
      console.log('tokenvalid?yes');

      return { props: { redirectDestination } };
      // return {
      //   redirect: {
      //     destination: `/user/${username}`,
      //     permanent: false,
      //   },
      // };
    }
    console.log('istokenvalid? no');

    return { props: { redirectDestination } };
  }
  return { props: { redirectDestination } };
}
//   return { props: {} };
// }

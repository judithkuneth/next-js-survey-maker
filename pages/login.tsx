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

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <Layout>
      <h1>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          const { success } = await response.json();

          if (!success) {
            setErrorMessage('Login failed');
          } else {
            setErrorMessage('');
            cookie.set('username', `${username}`);
            router.push(`/user/${username}`);
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

  if (session !== undefined) {
    const { getSessionByToken } = await import('../util/database');
    const sessionByToken = await getSessionByToken(session);
    const userId = sessionByToken.userId;
    console.log('session.userId', sessionByToken.userId);
    const { getUserById } = await import('../util/database');
    const user = await getUserById(userId);
    const username = user.username;
    // user.createdAt = JSON.stringify(user.createdAt);

    if (await isTokenValid(session)) {
      console.log('tokenvalid?yes');
      return {
        redirect: {
          destination: `/user/${username}`,
          permanent: false,
        },
      };
    }
    console.log('istokenvalid? no');

    return { props: {} };
  }
  return { props: {} };
}
//   return { props: {} };
// }

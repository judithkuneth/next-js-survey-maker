/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout.js';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup(props: { token: string }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <Layout>
      <h1>Signup</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: username,
              password: password,
              token: props.token,
            }),
          });
          const { success } = await response.json();
          if (success) {
            //   async (e) => {
            //     e.preventDefault();
            //     const response = await fetch('/api/login', {
            //       method: 'POST',
            //       headers: { 'Content-Type': 'application/json' },
            //       body: JSON.stringify({ username, password }),
            //     });
            //   };
            // }
            router.push(`/login`);
          } else {
            if (response.status === 403) {
              setErrorMessage('User already exists!');
            } else setErrorMessage('That Failed!');
          }
        }}
      >
        <p>User name</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <p>Email</p>
        <input type="email" placeholder="hello@mail.com"></input>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></input>

        <button>Signup</button>
      </form>
      <br />
      <a href="/login">I already have an account</a>
      <p style={{ color: 'red' }}>{errorMessage}</p>
    </Layout>
  );
}

export async function getServerSideProps() {
  const Tokens = (await import('csrf')).default;
  const tokens = new Tokens();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }
  const token = tokens.create(secret);

  return { props: { token } };
}

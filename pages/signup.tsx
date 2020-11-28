/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout.js';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

const formStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin: 50px;
    max-width: 500px;
    align-content: center;

    h1 {
      color: #d5d4d4;
      margin-bottom: 10px;
    }
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      p {
        color: #f7fcfc;
        font-weight: 500;
        margin-right: 5px;
      }

      a {
        font-weight: 600;
        color: #14a9a9;
      }
    }

    input {
      border-radius: 10px;
      padding-left: 5px;
      margin: 5px 0px;
      // width: 100%;
      // height: 20px;
      font-size: 18px;
      width: 100%;
    }
    button {
      width: none;
      color: #f7fcfc;
      border-color: #f7fcfc;
      font-size: 16px;
      font-weight: 550;
      border: none;
      padding: 0px 0px 0px 5px;
      margin-top: 5px;
    }
  }
`;

export default function Signup(props: {
  token: string;
  redirectDestination: string;
}) {
  // console.log('log redirectDestination', props.redirectDestination);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  function getPath() {
    if (props.redirectDestination !== '/') {
      return `/${props.redirectDestination}`;
    } else return '/login';
  }
  return (
    <Layout>
      <div css={formStyles}>
        <form
          onSubmit={async (e) => {
            // if (props.redirectDestination !== '/') {
            //   console.log('props.redirectDest !=== /');

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
              // console.log('success');

              if (props.redirectDestination !== '/') {
                // console.log('props.redirectDest !=== /');
                router.push(`/${props.redirectDestination}`);

                
              } else router.push(`/login`);
            } else {
              if (response.status === 403) {
                setErrorMessage('User already exists!');
              } else setErrorMessage('That Failed!');
            }
            // } else router.push(`/login`);
          }}
        >
          <h1>Signup</h1>

          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          ></input>

          <button>SIGNUP</button>

          <br />
          <div>
            <p>Already have an account?</p>
            <a href={getPath()}> Login </a>
          </div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const Tokens = (await import('csrf')).default;
  const tokens = new Tokens();
  const secret = process.env.CSRF_TOKEN_SECRET;

  const redirectDestination = context?.query?.returnTo ?? '/';
  // console.log('redirectDestination', redirectDestination);

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }
  const token = tokens.create(secret);

  return { props: { token, redirectDestination } };
}

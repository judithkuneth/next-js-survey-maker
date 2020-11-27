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
      margin-left: 5px;
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
      width: 97%;
      // height: 20px;
      font-size: 18px;
    }
    button {
      width: 100%;
      color: #f7fcfc;
      border-color: #f7fcfc;
      font-size: 16px;
      font-weight: 550;
      border: none;
      padding: 0px 0px;
      margin-top: 5px;
    }
  }
`;

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
      <div css={formStyles}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch('/api/login', {
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
              // cookie.set('username', `${username}`);
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
          <h1>Login</h1>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />

          <input
            placeholder="username"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          ></input>
          <button>Login</button>
          <br />
          <div>
            <p>New user? </p>
            <a href="/signup">Signup now</a>
          </div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </form>
      </div>
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

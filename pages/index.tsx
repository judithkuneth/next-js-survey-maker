/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { SerializedUser } from '../util/types';
import handler from './api/users';
import cookie from 'js-cookie';
import nextCookies from 'next-cookies';

type Props = {
  user: SerializedUser;
};

export default function Home(props: Props) {
  const username = cookie.getJSON('username');
  if (!props.user)
    return (
      <Layout>
        <div>
          You are not logged in, please{' '}
          <Link href="/login">
            <a>login</a>
          </Link>{' '}
          to get full access
        </div>
      </Layout>
    );

  const createdAt = new Date(JSON.parse(props.user.createdAt));
  return (
    // <div>
    <Layout username={username}>
      <Head>
        <title>Survey Maker</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <main>
        <h1>Landing Page</h1>
        <p>Hello you fucked up World</p>
        {/*Option 1:  */}
        {props.user.username}
        {props.user.createdAt.toString()}

        {/* Option 2: a date is an object, use .getDay or .toString to print it! */}
        {createdAt.getDay()}
        {createdAt.toString()}
        <Link href="/new">
          <a>
            <button>+ New Survey</button>
          </a>
        </Link>
      </main>

      <footer> </footer>
    </Layout>
    // </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById } = await import('../util/database');
  const { username } = nextCookies(context);
  if (username !== undefined) {
    const { getUserByUsername } = await import('../util/database');
    const user = await getUserByUsername(username);
    const serializedUser = {
      ...user,
      createdAt: JSON.stringify(user.createdAt),
    };

    console.log('log user', user);
    return {
      props: { user: serializedUser },
    };
  }
  console.log('log username', username);

  return { props: {} };
}

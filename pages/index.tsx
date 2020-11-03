/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { SerializedUser } from '../util/types';
import handler from './api/users';

type Props = {
  user: SerializedUser;
};

export default function Home(props: Props) {
  if (!props.user) return console.log('user not found');
  const createdAt = new Date(JSON.parse(props.user.createdAt));
  console.log(createdAt);
  return (
    // <div>
    <Layout>
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
  const user = await getUserById(1);
  user.createdAt = JSON.stringify(user.createdAt);
  return {
    props: {
      user: user,
    },
  };
}

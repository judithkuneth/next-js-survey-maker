/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { SerializedUser } from '../util/types';
import cookie from 'js-cookie';
import nextCookies from 'next-cookies';
import { isTokenValid } from '../util/auth';

type Props = {
  user: SerializedUser;
};

export default function Home(props: Props) {
  //// TODO: Create a nice landing page. Meanwhile redirect to /new
  // const username = cookie.getJSON('username');
  // if (!props.user)
  //   return (
  //     <Layout>
  //       <div>
  //         You are not logged in, please{' '}
  //         <Link href="/login">
  //           <a>login</a>
  //         </Link>{' '}
  //         to get full access
  //       </div>
  //     </Layout>
  //   );
  // const createdAt = new Date(JSON.parse(props.user.createdAt));
  // return (
  //   // <div>
  //   <Layout username={username}>
  //     <Head>
  //       <title>Survey Maker</title>
  //       <link rel="icon" href="/logo.jpg" />
  //     </Head>
  //     <main>
  //       <h1>Landing Page</h1>
  //       <p>Hello you fucked up World</p>
  //       {/*Option 1:  */}
  //       {props.user.username}
  //       {props.user.createdAt.toString()}
  //       {/* Option 2: a date is an object, use .getDay or .toString to print it! */}
  //       {createdAt.getDay()}
  //       {createdAt.toString()}
  //       <Link href="/new">
  //         <a>
  //           <button>+ New Survey</button>
  //         </a>
  //       </Link>
  //       <form
  //         onSubmit={async (e) => {
  //           e.preventDefault();
  //           const response = await fetch('/api/editsurvey', {
  //             method: 'POST',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify({
  //               username: 'gloria',
  //               slug: 'aaa',
  //             }),
  //           });
  //           const { success } = await response.json();
  //           if (success) {
  //             console.log('success');
  //           } else {
  //             if (response.status === 403) {
  //               console.log('User already exists!');
  //             } else console.log('That Failed!');
  //           }
  //         }}
  //       >
  //         <button>Submit</button>
  //       </form>
  //     </main>
  //     <footer> </footer>
  //   </Layout>
  //   // </div>
  // );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    redirect: {
      destination: '/new',
      permanent: false,
    },
  };
}

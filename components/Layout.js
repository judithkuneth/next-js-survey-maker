import Head from 'next/head';
import Header from './Header';
export default function Layout(props) {
  const username = props.username;
  return (
    <>
      <Head>
        <title>Quicksy</title>
        <link rel="icon" href="/logosmall.svg" />
      </Head>
      <Header username={username} />

      <main style={{ padding: 0, paddingTop: 0, minHeight: 650 }}>
        {props.children}
      </main>
    </>
  );
}

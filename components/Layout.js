import Head from 'next/head';
import Header from './Header';
export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Survey Maker Head</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Header />

      <main style={{ padding: 0, paddingTop: 50, minHeight: 650 }}>
        {props.children}
      </main>
    </>
  );
}

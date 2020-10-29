import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Survey Maker</title>
          <link rel="icon" href="/logo.jpg" />
        </Head>

        <main>
          <h1>Landing Page</h1>
          <p>Hello you fucked up World</p>
          <Link href="/new">
            <a>
              <button>+ New Survey</button>
            </a>
          </Link>
        </main>

        <footer> </footer>
      </Layout>
    </div>
  );
}

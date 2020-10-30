import Layout from '../components/Layout.js';
import Link from 'next/link';

export default function Login() {
  return (
    <Layout>
      <h1>Signup</h1>
      <p>User name</p>
      <input></input>
      <p>Email</p>
      <input type="email" placeholder="hello@mail.com"></input>
      <p>Password</p>
      <input type="password"></input>
      <Link href="/dashboard">
        <a>
          <button>Signup</button>
        </a>
      </Link>
      <br />
      <a href="/login">I already have an account</a>
    </Layout>
  );
}

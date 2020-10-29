import Layout from '../components/Layout.js';

export default function Login() {
  return (
    <Layout>
      <h1>Login</h1>
      <p>Email</p>
      <input type="email"></input>
      <p>Password</p>
      <input type="password"></input>
      <button>Singup</button>
      <br />
      <a href="/login">I already have an account</a>
    </Layout>
  );
}

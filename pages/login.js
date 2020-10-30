import Layout from '../components/Layout.js';

export default function Login() {
  return (
    <Layout>
      <h1>Login</h1>
      <p>Email</p>
      <input type="email"></input>
      <p>Password</p>
      <input type="password"></input>
      <button>Login</button>
      <br />
      <a href="/signup">New user? Signup here</a>
    </Layout>
  );
}

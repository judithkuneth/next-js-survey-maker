import Layout from '../components/Layout.js';

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
      <button>Login</button>
      <br />
      <a href="/signup">New user? Signup here</a>
    </Layout>
  );
}

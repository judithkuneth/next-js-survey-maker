/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout.js';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch('api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
        }}
      >
        <p>Email</p>
        <input type="email"></input>
        or
        <p>Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></input>
        <button>Login</button>
        <br />
        <a href="/signup">New user? Signup here</a>
      </form>
    </Layout>
  );
}

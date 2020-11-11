/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import React from 'react';

const headerStyles = css`
  nav {
    display: flex;
    position: fixed;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px 0px 0px;
    background-color: #fffcf2;
  }
  a {
    font-size: 20px;
    font-weight: bold;
    margin: 12px;
    div {
      font-size: 18px;
    }
  }
`;

export default function Header(props) {
  const username = props.username
  return (
    <header css={headerStyles}>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href={`/${username}`}>
          <a>Dashboard</a>
        </Link>
        <Link href="/new">
          <a>
            <button>+ New</button>
          </a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </nav>
    </header>
  );
}

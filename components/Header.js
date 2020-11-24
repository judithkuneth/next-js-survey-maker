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
  const username = props.username;
  console.log('username in header', username);
  return (
    <header css={headerStyles}>
      <nav>
        <Link href="/">
          <a>Logo</a>
        </Link>

        <Link href="/new">
          <a>
            <button>+ New</button>
          </a>
        </Link>

        {username === undefined ? (
          <Link href="/login">
            <a>Login</a>
          </Link>
        ) : (
          <div>
            <Link href={`/user/${username}`}>
              <a>Dashboard</a>
            </Link>

            <Link href="/logout">
              <a>logout</a>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

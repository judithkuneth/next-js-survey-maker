/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import React from 'react';

const headerStyles = css`
  nav {
    display: flex;
    position: static;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px 0px 0px;
    background-color: #363232;
  }
  a {
    font-size: 20px;
    font-weight: normal;
    margin: 12px;
    color: #d5d4d4;
    div {
      font-size: 18px;
    }
  }
`;

export default function Header(props) {
  const username = props.username;
  // console.log('username in header', username);
  return (
    <header css={headerStyles}>
      <nav>
        <Link href="/">
          <img
            alt=""
            src="../logo-white.svg"
            height="40"
            style={{ margin: '10px 5px' }}
          />
        </Link>

        {/* <Link href="/new">
          <a>
            <button>+ New</button>
          </a>
        </Link> */}
        {username ? (
          <Link href={`/user/${username}`}>
            <a>Dashboard</a>
          </Link>
        ) : (
          <div></div>
        )}

        {username === undefined ? (
          <Link href="/login">
            <a>Login</a>
          </Link>
        ) : (
          // <div>
          //   <Link href={`/user/${username}`}>
          //     <a>Dasboard</a>
          //   </Link>

          <Link href="/logout">
            <a>logout</a>
          </Link>
          // </div>
        )}
      </nav>
    </header>
  );
}

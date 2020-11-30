/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import Link from 'next/link';
import { isTokenValid } from '../util/auth';

const formStyles = css`
display: flex;
  flex-direction: column;
  // align-items: center;
  align-items: center;
  h1{color:#767474;}
form{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 50px;
  background-color: #f7fcfc;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 80%;
  max-width:500px;
  align-content: center;

  text-align:center;

  h1{
    color:#363232;
    margin-bottom:20px;
    font-size: 38px;
  }

  h3{
    margin-top:20px;
    font-weight: 500;
  }
  h4{
    margin-top: 5px;
  }
  div{
    margin-top: 10px;
    display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  button{
    width: 120px;
    // border-color: #f7fcfc;
    // font-size: 16px;
    // font-weight: 500;
    
  }
  }
  
  // button{
  //   width: 100%;
  //   margin-top:50px;
  //   border-color: #f7fcfc;
  //   font-size: 16px;
  //   font-weight: 500;
  //   color:#f7fcfc;
  // }
  
  // algn-self: center;}
}
`;

export default function thanks(props) {
  const loggedIn = props.loggedIn;
  if (loggedIn) {
    return (
      <Layout username={props.user.username}>
        <div css={formStyles}>
          <form
          // onSubmit={async (e) => {
          //   e.preventDefault();
          //   const response = await fetch('/api/addresponse', {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify({
          //       responseValues: responseValues,
          //     }),
          //   });
          // }}
          >
            <h1>Thanks :)</h1>
            <img alt="" src="logo-black.svg" />
            <h3>Let's keep in touch.</h3>
            <h4>You can find me an my projects on</h4>
            <div>
              <button
                onClick={(e) => {
                  window.location.href=
                    'https:www.linkedin.com/in/judith-kuneth'
                  
                }}
                style={{
                  color: '#f7fcfc',
                  backgroundColor: '#30CDCD',
                  width: '120px',
                  borderColor: '#30CDCD',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Linkedin
              </button>
              <button
                onClick={(e) => {
                  window.open('https:www.github.com/judithkuneth', '_blank');
                }}
                style={{
                  color: '#30CDCD',
                  backgroundColor: '#f7fcfc',
                  width: '120px',
                  borderStyle: 'solid',
                  borderColor: '#30CDCD',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Github
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  } else
    return (
      <Layout>
        <div css={formStyles}>
          <form
          // onSubmit={async (e) => {
          //   e.preventDefault();
          //   const response = await fetch('/api/addresponse', {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify({
          //       responseValues: responseValues,
          //     }),
          //   });
          // }}
          >
            <h1>Thanks :) </h1>
            <img alt="" src="logo-black.svg" />
            <h3>Let's keep in touch.</h3>
            <h4>You can find me an my projects on</h4>
            <div>
              <button
                onClick={(e) => {
                  window.open(
                    'https:www.linkedin.com/in/judith-kuneth',
                    '_blank',
                  );
                }}
                style={{
                  color: '#f7fcfc',
                  backgroundColor: '#30CDCD',
                  width: '120px',
                  borderColor: '#30CDCD',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Linkedin
              </button>
              <button
                onClick={(e) => {
                  window.open('https:www.github.com/judithkuneth', '_blank');
                }}
                style={{
                  color: '#30CDCD',
                  backgroundColor: '#f7fcfc',
                  width: '120px',
                  borderStyle: 'solid',
                  borderColor: '#30CDCD',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Github
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const { session } = nextCookies(context);

  /* console.log('check', await isTokenValid(session)); */

  if (await isTokenValid(session)) {
    /* console.log('token valid'); */
    const { getSessionByToken } = await import('../util/database');
    const sessionByToken = await getSessionByToken(session);
    /* console.log('sessionByToken', sessionByToken); */

    const userId = sessionByToken.userId;
    /* console.log('userId', sessionByToken.userId); */

    const { getUserById } = await import('../util/database');
    const user = await getUserById(userId);
    /* console.log('user', user); */
    user.createdAt = JSON.stringify(user.createdAt);
    return {
      props: {
        user,
        loggedIn: true,
      },
    };
  }

  return {
    props: {
      loggedIn: false,
    },
  };
}

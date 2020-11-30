/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import { isTokenValid } from '../util/auth';

const componentStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  h1 {
    color: #f7fcfc;
    font-weight: normal;
    margin: 10px 0px;
    text-align: center;
  }

  form {
    width: 80%;
    max-width: 500px;
    height: 220px;
    background-color: #f7fcfc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    padding-left: 20px;
    padding: 20px;
    margin-top: 20px;
    justify-content: space-evenly;
    border-style: solid;
    border-width: 3px;

    input {
      width: 100%;
    }

    button {
      width: 100%;
      color: #f7fcfc;
      font-size: 16px;
      font-weight: 550;
      border: none;
    }
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      p {
        margin-top: 5px;
      }
      input {
        font-size: 13px;
        width: 150px;
        height: 20px;
      }
    }
  }
`;

export default function New(props) {
  const user = props.user;
  const [errorMessage, setErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  
  const [slug, setSlug] = useState(title);
  const router = useRouter();
  
  
  if (user.id !== 1) {
    
    return (
      //TODO input URL: make sure no spaces allowed
      <React.Fragment>
        <Layout username={user.username}>
          <div css={componentStyles}>
            <img src="logo.svg" alt="" height="120" />
            <h1>a quick survey for honest feedback</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await fetch('/api/addsurvey', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: user.id,
                    title: title,
                    customSlug: slug,
                  }),
                });
                const { success } = await response.json();
                if (success) {
                  router.push(`/${slug}/edit`);
                } else {
                  if (response.status === 403) {
                    setErrorMessage('Slug not available!');
                  } else setErrorMessage('That Failed!');
                }
              }}
            >
              <input
                onChange={(e) => {
                  setTitle(e.currentTarget.value), setSlug(e.currentTarget.value.replace(/ /g,"-"));
                }}
                placeholder="My first Quicksy"
              ></input>
              <div>
                <p>www.survey.com/</p>
                <input
                  placeholder = {slug}
                  onChange={(e) => {
                    setSlug(e.currentTarget.value);
                  }}
                />
              </div>

              <button
              >
                CREATE SURVEY
              </button>
            </form>
          </div>
          {errorMessage}
        </Layout>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <div css={componentStyles}>
          <img src="logo.svg" alt="" height="120" />
          <h1>a quick survey for honest feedback</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await fetch('/api/addsurvey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: user.id,
                  title: title,
                  customSlug: slug,
                }),
              });
              const { success } = await response.json();
              if (success) {
                router.push(`/${slug}/edit`);
              } else {
                if (response.status === 403) {
                  setErrorMessage('Slug already in use. Try another one!');
                }
                if (response.status === 404) {
                  setErrorMessage('404 error');
                } else setErrorMessage('That Failed!');
              }
            }}
          >
            <input data-cy="input-survey-title"
              onChange={(e) => {
                setTitle(e.currentTarget.value), setSlug(e.currentTarget.value.replace(/ /g,"-"));
              }}
              placeholder="My Quicksy"
            ></input>

            <div>
              <p>myquicksy.com/</p>
              <input data-cy="input-survey-slug"
                placeholder={slug}
                onChange={(e) => {
                  setSlug(e.currentTarget.value);
                }}
              />
            </div>

            <button data-cy="button-survey-create"
            >
              CREATE SURVEY
            </button>
          </form>
        </div>
        {errorMessage}
      </Layout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const { session } = nextCookies(context);
  
   if(session)

  if (await isTokenValid(session)) {

    const { getSessionByToken } = await import('../util/database');

    const sessionByToken = await getSessionByToken(session);
    
    if (sessionByToken === 'undefined'){
     
    return{redirect: {
      destination: '/logout',
      permanent: false,
    },}}
    
    const userId = sessionByToken.userId;
    

    const { getUserById } = await import('../util/database');
    const user = await getUserById(userId);
    user.createdAt = JSON.stringify(user.createdAt);
    return { props: { user } };
  }
  

  const dummyUser = { id: 1 };
  return { props: { user: dummyUser } };
}

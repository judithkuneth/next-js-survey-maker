/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import Questions from '../components/Questions';

const mainStyles = css`
  background: blue;
`;

export default function New() {
  const [title, setTitle] = useState('My first Survey');
  const [url, setUrl] = useState('survey');
  return (
    //TODO input URL: make sure no spaces allowed
    <React.Fragment>
      <Layout css={mainStyles}>
        <h3>Add a Title</h3>
        <input
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          placeholder="My first Survey"
        ></input>
        <br />
        <br />
        <h3>Customize your URL</h3>
        www.survey.com/
        <input
          placeholder="custom URL"
          onChange={(e) => {
            setUrl(e.currentTarget.value);
          }}
        />
        <br />
        <br />
        <Link href="/questions">
          <a>
            <button>+ Add Questions</button>
          </a>
        </Link>
        <br />
        <br />
        <br />
        -----------------------preview----------------------------------------------------
        <h1>{title}</h1>
        www.survey.com/{url}
        <h3>How was the pace of this lecture</h3>
        <input placeholder="too slow" /> ------------X------------
        <input placeholder="too fast" />
        <h3>How relevant was the content to you?</h3>
        <input placeholder="very relevant" />
        <br />|
        <br />|
        <br />|
        <br />|
        <br />X
        <br />|
        <br />|
        <br />|
        <br />
        <input placeholder="not at all" />
        <h3>Would you recommend this lecture to others?</h3>
        <button>Yes</button>
        <button>No</button>
        <br />
        <br />
        <button>
          <h2>Submit</h2>
        </button>
        <br />
        <br />
        <Link href="/signup">
          <a>
            <button>
              <h1>Save Draft</h1>
            </button>
          </a>
        </Link>
        <Link href="/signup">
          <a>
            <button>
              <h1>Publish</h1>
            </button>
          </a>
        </Link>
      </Layout>
    </React.Fragment>
  );
}

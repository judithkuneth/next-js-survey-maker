/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import Questions from '../components/Questions';

export default function questions() {
  const [myQuestions, setMyQuestions] = useState([]);
  const questionOne = { id: 1, title: 'I`m a question type one' };
  const questionTwo = { id: 2, title: 'I`m a question type two' };
  const questionThree = { id: 3, title: 'I`m a question type three' };

  function updateMyQuestions(addedQuestion) {
    return [...myQuestions, addedQuestion];
  }

  return (
    <Layout>
      <h1>Add one or more questions:</h1>
      <div>Some X axis slider here</div>
      <button onClick={() => setMyQuestions(updateMyQuestions(questionOne))}>
        Add Question Type 1
      </button>
      <div>Some Y axis slider here</div>
      <button onClick={() => setMyQuestions(updateMyQuestions(questionTwo))}>
        Add Question Type 2
      </button>
      <div>Some thumbs up and down here</div>
      <button onClick={() => setMyQuestions(updateMyQuestions(questionThree))}>
        Add Question Type 3
      </button>
      <h1>{myQuestions.length} Questions selected:</h1>
      <Questions myQuestions={myQuestions} />
      <Link href="/new">
        <a>
          <button>Done</button>
        </a>
      </Link>
    </Layout>
  );
}

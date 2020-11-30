/** @jsx jsx */
/** @jsxRuntime classic */
/** @jsxFrag React.Fragment */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import questions from '../pages/questions';
import { Survey, Question } from '../util/types';

const saveButtonStyles = css`
  background-color: #f7fcfc;
  border: solid;
  border-color: #30cdcd;
  border-width: 2px;
  margin-top: 10px;
  width: 100%;
`;

const deleteFormStyles = css`
  display: flex;
  flex-direction: row;
  align-content: flex-end;
  button {
    color: #e99393;
    background-color: #f7fcfc;
    height: 20px;
    width: 20px;
    text-align: end;
  }
`;

const componentStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px;
  background-color: #f7fcfc;
  padding: 20px;
  border-radius: 10px;
  // max-width: 400px;

  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    input {
      width: 100%;
    }
    select {
      width: 80px;
      margin-bottom: 20px;
    }
    // button {
    //   width: 150px;
    // }
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 10px;

      input {
        border-top-style: hidden;
        border-right-style: hidden;
        border-left-style: hidden;
        border-bottom-style: solid;
        border-radius: 0px;
        border-color: #c1bfbf;
        width: 120px;
        height: 30px;
      }
    }
  }
`;

export default function EditQuestionComponent(props: { question: Question }) {
  const router = useRouter();
  const question = props.question;

  const questionId = question.id;
  const [itemOrder, setItemOrder] = useState(question.itemOrder);
  const [questionType, setQuestionType] = useState('x_slider');
  const [title, setTitle] = useState(question.title);
  const [valueMin, setValueMin] = useState(question.valueMin);
  const [valueMax, setValueMax] = useState(question.valueMax);
  const [descriptionMin, setDescriptionMin] = useState(question.descriptionMin);
  const [descriptionMax, setDescriptionMax] = useState(question.descriptionMax);

  return (
    <div css={componentStyles}>
      <form
        css={deleteFormStyles}
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/deletequestion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: questionId,
            }),
          });
          const { success } = await response.json();
    if (success) {
      location.reload();
    }
        }}
      >
        <button
          
        >
          X
        </button>
      </form>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/editquestion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: questionId,
              itemOrder: itemOrder,
              questionType: questionType,
              title: title,
              valueMin: valueMin,
              valueMax: valueMax,
              descriptionMin: descriptionMin,
              descriptionMax: descriptionMax,
            }),
          });
        }}
      >
        <select
          name="questionType"
          id="questionType"
          onChange={(e) => {
            setQuestionType(e.currentTarget.value);
          }}
        >
          <option value="x_slider">x slider</option>
          <option value="y_slider">y slider</option>
          <option value="gauge">gauge</option>
          <option value="binary">buttons</option>
        </select>

        <input
          placeholder="Content relevancy"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />

        <div>
          <input
            style={{
              width: '50px',
              textAlign: 'center',
              fontSize: '16px',
              height: '20px',
            }}
            placeholder="-2"
            value={valueMin}
            type="number"
            onChange={(e) => {
              setValueMin(e.currentTarget.valueAsNumber);
            }}
          />
          <input
            style={{
              width: '50px',
              textAlign: 'center',
              fontSize: '16px',
              height: '20px',
            }}
            placeholder="2"
            value={valueMax}
            type="number"
            onChange={(e) => {
              setValueMax(e.currentTarget.valueAsNumber);
            }}
          />
        </div>
        <input type="range"></input>
        <div>
          <input
            placeholder="very poor"
            value={descriptionMin}
            onChange={(e) => {
              setDescriptionMin(e.currentTarget.value);
            }}
          />

          <input
            placeholder="very good"
            value={descriptionMax}
            onChange={(e) => {
              setDescriptionMax(e.currentTarget.value);
            }}
          />
        </div>

        <div>
          <button css={saveButtonStyles}>Save changes</button>
        </div>
      </form>
      {/*TODO: Refresh onClick!*/}
      {/* <Link href = {`/edit/${surveyId}`}> */}

      {/* </Link> */}
    </div>
  );
}

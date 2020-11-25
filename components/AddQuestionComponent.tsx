/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';

import { useState } from 'react';
import { Survey } from '../util/types';

export default function AddQuestionComponent(props: { survey: Survey }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [itemOrder, setItemOrder] = useState(0);
  const [questionType, setQuestionType] = useState('x_slider');
  const [title, setTitle] = useState('level of interaction');
  const [valueMin, setValueMin] = useState(-2);
  const [valueMax, setValueMax] = useState(2);
  const [descriptionMin, setDescriptionMin] = useState('very poor');
  const [descriptionMax, setDescriptionMax] = useState('very good');

  const componentStyles = css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px;
    background-color: #f7fcfc;
    padding: 20px;
    border-radius: 10px;

    form {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      input {
        width: 100%;
      }

      button {
        width: 100%;
        margin-top: 20px;
        background-color: #f7fcfc;
        border: solid;
        border-color: #30cdcd;
        border-width: 2px;
      }
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
          width: 100px;
          height: 30px;
        }
      }
    }
  `;

  return (
    <div css={componentStyles}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/addquestion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              surveyId: surveyId,
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
        <input
          placeholder="level of interaction"
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
            onChange={(e) => {
              setDescriptionMin(e.currentTarget.value);
            }}
          />
          <input
            placeholder="very good"
            onChange={(e) => {
              setDescriptionMax(e.currentTarget.value);
            }}
          />
        </div>

        <button
          onClick={(e) => {
            location.reload(true);
          }}
        >
          Add question
        </button>
      </form>
    </div>
  );
}

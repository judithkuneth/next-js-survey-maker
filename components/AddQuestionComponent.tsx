import { useState } from 'react';
import { Survey } from '../util/types';

export default function AddQuestionComponent(props: { survey: Survey }) {
  const [surveyId, setSurveyId] = useState(props.survey.id);
  const [itemOrder, setItemOrder] = useState(0);
  const [questionType, setQuestionType] = useState('x_slider');
  const [title, setTitle] = useState('Pace');
  const [valueMin, setValueMin] = useState(-5);
  const [valueMax, setValueMax] = useState(5);
  const [descriptionMin, setDescriptionMin] = useState('too slow');
  const [descriptionMax, setDescriptionMax] = useState('too fast');

  return (
    <>
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
          placeholder="title"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <input
          placeholder="min value"
          type="number"
          onChange={(e) => {
            setValueMin(e.currentTarget.valueAsNumber);
          }}
        />
        <input
          placeholder="description"
          onChange={(e) => {
            setDescriptionMin(e.currentTarget.value);
          }}
        />
        <input
          placeholder="max value"
          type="number"
          onChange={(e) => {
            setValueMax(e.currentTarget.valueAsNumber);
          }}
        />
        <input
          placeholder="description"
          onChange={(e) => {
            setDescriptionMax(e.currentTarget.value);
          }}
        />

        <button
          onClick={(e) => {
            location.reload(true);
          }}
        >
          Add question
        </button>
      </form>
    </>
  );
}

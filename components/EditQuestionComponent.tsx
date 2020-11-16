import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import questions from '../pages/questions';
import { getQuestionWhereSurveyIdIs } from '../util/database';

export default function EditQuestionComponent(props) {
  const router = useRouter();
  const question = props.question;
  const surveyId = props.surveyId;

  const questionId = question.id;
  const [itemOrder, setItemOrder] = useState(question.itemOrder);
  const [questionType, setQuestionType] = useState('x_slider');
  const [title, setTitle] = useState(question.title);
  const [valueMin, setValueMin] = useState(question.valueMin);
  const [valueMax, setValueMax] = useState(question.valueMax);
  const [descriptionMin, setDescriptionMin] = useState(question.descriptionMin);
  const [descriptionMax, setDescriptionMax] = useState(question.descriptionMax);

  return (
    <>
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
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <input
          value={valueMin}
          type="number"
          onChange={(e) => {
            setValueMin(e.currentTarget.valueAsNumber);
          }}
        />
        <input
          value={descriptionMin}
          onChange={(e) => {
            setDescriptionMin(e.currentTarget.value);
          }}
        />
        <input
          value={valueMax}
          type="number"
          onChange={(e) => {
            setValueMax(e.currentTarget.valueAsNumber);
          }}
        />
        <input
          value={descriptionMax}
          onChange={(e) => {
            setDescriptionMax(e.currentTarget.value);
          }}
        />
        <button>Save changes</button>
      </form>
      {/*TODO: Refresh onClick!*/}
      {/* <Link href = {`/edit/${surveyId}`}> */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/deletequestion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: questionId,
            }),
          });
        }}
      >
        <button
        // does not work:
        // onClick ={(e)=>{location.reload}}
        >
          delete
        </button>
      </form>
      {/* </Link> */}
    </>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import questions from '../pages/questions';
import { Survey, Question } from '../util/types';

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
          placeholder="Question e.g. How relevant was this course to you?"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <br />
        <select
          name="questionType"
          id="questionType"
          onChange={(e) => {
            setQuestionType(e.currentTarget.value);
          }}
        >
          <option value="x_slider">slider horizontal</option>
          <option value="y_slider">slider vertical</option>
          <option value="gauge">gauge (premium)</option>
          <option value="binary">buttons Y/N</option>
        </select>
        <br />
        <br />
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
        <input type="range"></input>

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
        <br />
        <button>Save changes</button>
        <br />
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
          onClick={(e) => {
            location.reload(true);
          }}
        >
          delete question
        </button>
      </form>
      {/* </Link> */}
    </>
  );
}

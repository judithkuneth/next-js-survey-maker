export default function Questions(props) {
  const myQuestions = props.myQuestions;
  console.log(myQuestions);
  return myQuestions.map((question) => {
    return <div key={question.id}>{question.title}</div>;
  });
}

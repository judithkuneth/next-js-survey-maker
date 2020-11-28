import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export default function BarChartComponent(props) {
  const responses = props.responses;
  const question = props.question;
  // const questions = props.questions;
  // console.log('questions length', questions.length);
  // for (let i = 0; i < questions.length; i++) {
  //   console.log('lets run this stuff i times', i);
  // }

  // const question = questions[0];

  const responseValues = responses.map((r) => {
    if (r.questionId === question.id) {
      return r.responseValue;
    }
  });
  // console.log('responseValues', responseValues);

  // count occurence of a value:
  //function(array,value)=>array.reduce((),0)

  const countOccurrences = (responseValues, value) =>
    responseValues.reduce((a, v) => (v === value ? a + 1 : a), 0);

  const barChartData = [];

  // go through every possible value from min Value to MaxValue and count occurence each time:

  for (let step = question.valueMin; step < question.valueMax + 1; step++) {
    const countByValue = {
      value: step,
      n: countOccurrences(responseValues, step),
    };
    // console.log('countByValue', countByValue);

    barChartData.push(countByValue);
    // console.log('updated barChartData', barChartData);

    // console.log(
    //   'countOccurence of step',
    //   step,
    //   countOccurrences(responseValues, step),
    // );
  }

  // console.log('BarChartComponent.js: responses', responses);
  // const barChartData = [
  //   { value: -2, n: 2 },
  //   { value: -1, n: 3 },
  //   { value: 0, n: 10 },
  //   { value: 1, n: 3 },
  //   { value: 2, n: 4 },
  // ];

  // console.log('responses', responses);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        // width={400}
        // height={300}
        data={barChartData}
        margin={{ top: 10, right: 10, left: 10, bottom: 50 }}
      >
        <XAxis dataKey="value" />

        <Tooltip />

        <Bar dataKey="n" fill="#30CDCD" />
      </BarChart>
    </ResponsiveContainer>
  );
}

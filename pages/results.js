/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/core';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function results() {
  const list = [
    { value: -2, N: 2 },
    { value: -1, N: 3 },
    { value: 0, N: 10 },
    { value: 1, N: 3 },
    { value: 2, N: 4 },
  ];
  return (
    <Layout>
      <br />
      <br />
      <br />
      <br />

      <BarChart
        width={600}
        height={300}
        data={list}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="value" />
        {/* <YAxis /> */}
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="N" fill="#30CDCD" />
      </BarChart>
    </Layout>
  );
}

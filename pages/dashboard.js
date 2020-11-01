/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, css } from '@emotion/core';
import Layout from '../components/Layout';

export default function dashboard() {
  return (
    <Layout>
      <h2>Dashboard</h2>
      <div>
        <h3>UX Workshop</h3>
        <p>status: published</p>
        <p>responses:10</p>
        <button
          onClick={(e) => {
            window.location.href = '/results';
          }}
        >
          results
        </button>
        <button>share</button>
        <button
          onClick={(e) => {
            window.location.href = '/new';
          }}
        >
          edit
        </button>
        <button>delete</button>
      </div>
      <div>
        <h3>UX 101</h3>
        <p>status: draft</p>
        <p>responses:0</p>
        <button>edit</button>
        <button>delete</button>
      </div>
    </Layout>
  );
}

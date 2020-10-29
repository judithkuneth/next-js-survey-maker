import Layout from '../components/Layout';
import { useState } from 'react';

export default function New() {
  const [url, setUrl] = useState('survey');
  return (
    //TODO input URL: make sure no spaces allowed
    <Layout>
      <input placeholder="My first survey"></input>
      <br />
      <br />
      <input
        placeholder="custom URL"
        onChange={(e) => {
          setUrl(e.currentTarget.value);
        }}
      />
      <br />
      URL: brand.com/{url}
      <br />
      <div id="addQuestion">
        <div>Im a Modal yay</div>
      </div>
      <button
        onClick={
          (document.getElementById('addQuestion').style.display = 'block')
        }
      >
        {' '}
        + Add Question
      </button>
    </Layout>
  );
}

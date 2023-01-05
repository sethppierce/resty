import React from 'react';
import JSONPretty from 'react-json-pretty';
import './results.scss';

const Results = (props) =>{
  let JSONPrettyMon = require('react-json-pretty/dist/monikai');
  const { data } = props;
    return (
      <section data-testid="results-display">
        {data === 'Loading...' || !data  ? <JSONPretty id="json-pretty" data-testid="loading" data={data} theme={JSONPrettyMon}></JSONPretty>: <JSONPretty id="json-pretty" data-testid="results" data={data} theme={JSONPrettyMon}></JSONPretty>}
      </section>
    );
  }


export default Results;


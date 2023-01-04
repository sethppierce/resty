import React from 'react';
import JSONPretty from 'react-json-pretty';
import './results.scss';

const Results = (props) =>{
  let JSONPrettyMon = require('react-json-pretty/dist/monikai');
  const { data } = props;
    return (
      <section data-testid="results-display">
        {data ? <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}></JSONPretty>: null}
      </section>
    );
  }


export default Results;


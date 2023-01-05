import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';


const App = (props) => {

  const [data, setData ] = useState(null)
  const [requestParams, setRequestParams ] = useState({})

  useEffect(() => {
    async function callApi(){
      // mock output
      setData('Loading...')
      try {
        let results;
        if(requestParams === {}){ return setData('Please enter a URL')}
        if(requestParams.method !== 'get' || requestParams.method !== 'delete'){
          results = await axios({
            method: requestParams.method,
            url: requestParams.url,
            data: requestParams.data
          });
        } else {
          results = await axios({
            method: requestParams.method,
            url: requestParams.url
          });
        }
        setData(results.data);
      } catch (error) {
        setData(error.message)
      }
    }
    callApi();
  }, [requestParams]);

    return (
      <React.Fragment>
        <Header />
        <div className='bodyContainer'>
          <div id='requestURL'>
            <p>Request Method: {requestParams.method}</p>
            <p>URL: {requestParams.url}</p>
          </div>
          <div id='container'>
            <Form setRequestParams={setRequestParams} />
            <Results data={data} />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );

}

export default App;

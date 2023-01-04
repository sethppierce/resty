import React, { useState } from 'react';
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


  const callApi = async (requestParams) => {
    // mock output
    setData('Loading...')
    setRequestParams(requestParams);
    try {
      let results;
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

    return (
      <React.Fragment>
        <Header />
        <div>
          <p>Request Method: {requestParams.method}</p>
          <p>URL: {requestParams.url}</p>
        </div>
        <div id='container'>
          <Form handleApiCall={callApi} />
          <Results data={data} />
        </div>
        <Footer />
      </React.Fragment>
    );

}

export default App;

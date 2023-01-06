import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history';


export const initialState = {
  requestParams: {
    method: null,
    url: null,
    data: null
  },
  data: '',
  history: [],
}

export const requestReducer = (state = initialState, action) => {
  switch(action.type){
    case 'setParams':
      return {...state, requestParams: {
        method: action.payload.method,
        url: action.payload.url,
        data: action.payload.data ? action.payload.data : null
      }};
    case 'setData':
      return {...state, data: action.payload};
    case 'setHistory':
      return {...state, history: [...state.history, action.payload]}
    default:
        return state;
  }
}

const App = (props) => {
  
  const [state, dispatch] = useReducer(requestReducer, initialState);


  useEffect(() => {
    async function callApi(){
      // mock output
      setData('Loading...')
      try {
        let results;
        if(state.requestParams === {}){ return setData('Please enter a URL')}
        if(state.requestParams.method !== 'get' && state.requestParams.method !== 'delete'){
          results = await axios({
            method: state.requestParams.method,
            url: state.requestParams.url,
            data: state.requestParams.data
          });
        } else {
          results = await axios({
            method: state.requestParams.method,
            url: state.requestParams.url
          });
        }
        setHistory({
          method: state.requestParams.method,
          url: state.requestParams.url,
          results: results.data
        })
        setData(results.data);
      } catch (error) {
        setData(error.message)
      }
    }
    callApi();
  }, [state.requestParams]);


  const setRequestParams = (params) => {
    let action = {
      type: 'setParams',
      payload: params,
    }
    dispatch(action);

  }

  const setData = (data) => {
    let action = {
      type: 'setData',
      payload: data,
    }
    dispatch(action);
    
  }

  const setHistory = (history) => {
    let action
    if (!state.history.some(request => request.url === history.url && request.method === history.method)) {
      action = {
        type: 'setHistory',
        payload: history
      }
      dispatch(action)
    }
    console.log(state)
  }

  return (
      <React.Fragment>
        <Header />
        <div className='bodyContainer'>
          <div id='requestURL'>
            <p>Request Method: {state.requestParams.url}</p>
            <p>URL: {state.requestParams.url}</p>
          </div>
          <div id='container'>
            <div id='formHistory'>
            <Form setRequestParams={setRequestParams} />
            <History history={state.history} setRequestParams={setData}/>
            </div>
            <Results data={state.data} />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );

}

export default App;

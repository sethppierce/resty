import React, { useState } from 'react';
import './form.scss';

const Form = (props) => {
  const { handleApiCall } = props;
  const [method , setMethod] = useState('get');
  const [url , setUrl] = useState();
  const [area , setArea] = useState(false);
  const [requestBody, setRequestBody] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(e.target.url.value)
    const formData = {
      method: method,
      url: url,
      data: JSON.stringify(requestBody)
    };
    console.log(formData.data)
    handleApiCall(formData);
  }
  const handleMethodSelect = (e) => {
    setMethod(e.target.id);
    if(method === 'post' || method === 'put'){
      setArea(true)
    } else { setArea(false) }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span data-testid="form-URL">URL: </span>
        <input name='url' type='text' data-testid="form-input"/>
        <button type="submit" data-testid="form-button">GO!</button>
      </label>
      <label className="methods" >
        <span id="get" data-testid="form-get" onClick={handleMethodSelect}>GET</span>
        <span id="post" data-testid="form-post" onClick={handleMethodSelect}>POST</span>
        <span id="put" data-testid="form-put"  onClick={handleMethodSelect}>PUT</span>
        <span id="delete" data-testid="form-delete" onClick={handleMethodSelect}>DELETE</span>
      </label>
      {
        area === false ? null :
      <label id='request' >
        <span>Request Body: </span>
        <textarea id='requestBody' data-testid="form-textarea" value={requestBody} onChange={(e) => setRequestBody(e.target.value)} />
      </label>
      }
    </form>
  );
}

export default Form;
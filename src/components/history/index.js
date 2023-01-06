import React from 'react'

const History = (props) => {
  const {history, setRequestParams} = props;

  const historyRequest = (index) => {
    setRequestParams(history[index]);
  }
  return (
    <>
      <div>
        <p>History</p>
        <ul>
          {
            history.map((request, index) => {
              return <li key={`request-${index}`} onClick={() => historyRequest(index)}>{request.url}, method: {request.method}</li>
            })
          }
        </ul>
      </div>
    </>
  )
}

export default History;
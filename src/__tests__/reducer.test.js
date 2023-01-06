import { initialState, requestReducer } from "../app";

describe('Request Reducer', () => {

  test('initial state is as expected', () => {
    let state = requestReducer(initialState, {})
    expect(state).toEqual(initialState)
  });
  
  test('should handle setParams case', () => {
    let state = requestReducer(initialState, {})
    state = requestReducer(state, {
      type: 'setParams',
      payload: { method: 'POST', url: 'https://test.com', data: { test: 'test' } }
    })
    expect(state.requestParams.url).toEqual('https://test.com');
  });

  test('should handle setData case', () => {
    let state = requestReducer(initialState, {})
    state = requestReducer(state, {
      type: 'setData',
      payload: 'test'
    })
    expect(state.data).toEqual('test');
  });

  test('should handle setHistory case', () => {
    let state = requestReducer(initialState, {})
    state = requestReducer(state, {
      type: 'setHistory',
      payload: 'test'
    })
    expect(state.history[0]).toEqual('test');
  });
})
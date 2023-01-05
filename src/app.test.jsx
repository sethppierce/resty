import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import App from './app';
const server = setupServer(
  rest.get('/testGet', (req, res, ctx) => {
    return res(ctx.json({
      results: [
        {name: 'Seth', age: 25},
        {name: 'Bagheera', age: 5},
      ],
  }));
  }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('App Component', () => {
  test('renders results when API call is made', async () => {
    render(<App />);
    
    const input = screen.getByTestId('form-input');
    const button = screen.getByTestId('form-button');
    fireEvent.change(input, {target: {value: '/testGet'}})
    fireEvent.click(button);
    
    await screen.findByTestId('results');
    expect(screen.getByTestId('results')).toHaveTextContent('Seth');
  });
  test('renders Loading when API call is loading', async () => {
    render(<App />);
    
    const input = screen.getByTestId('form-input');
    const button = screen.getByTestId('form-button');
    fireEvent.change(input, {target: {value: '/testGet'}})
    fireEvent.click(button);
    
    await screen.findByTestId('loading');
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');
  });
});

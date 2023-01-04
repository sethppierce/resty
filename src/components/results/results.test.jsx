import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';

import Results from './index';

describe('Results test', () => {
  test('Results are not rendered when data is null', () => {
    render(<Results/>);

    const results = screen.getByTestId('results-display');

    expect(results).toHaveTextContent('');
  });
  test('Results are  rendered when data is not null', () => {
    render(<Results data={'test'}/>);

    const results = screen.getByTestId('results-display');

    expect(results).toHaveTextContent('test');
  });
})
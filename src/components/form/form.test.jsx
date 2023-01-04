import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';

import Form from './index';

describe('Form test', () => {

  test('should render the form', () => {
    render(<Form />);
    expect(screen.getByTestId('form-URL')).toBeInTheDocument();
    expect(screen.getByTestId('form-button')).toBeInTheDocument();
  });

  test('should render the method selectors', () => {
    render(<Form />);
    expect(screen.getByTestId('form-get')).toBeInTheDocument();
    expect(screen.getByTestId('form-post')).toBeInTheDocument();
    expect(screen.getByTestId('form-put')).toBeInTheDocument();
    expect(screen.getByTestId('form-delete')).toBeInTheDocument();
  });

  test('should not render the request body textarea by default', () => {
    render(<Form />);
    expect(screen.queryByTestId('form-textarea')).not.toBeInTheDocument();
  });
  test('textarea is not rendered when get is selected', () => {
    render(<Form />);

    const getSpan = screen.getByTestId('form-get');
    const textarea = screen.queryByTestId('form-textarea')

    fireEvent.click(getSpan);
    expect(textarea).toBeNull();
  });

  test('textarea is not rendered when delete is selected', () => {
    render(<Form />);

    const deleteSpan = screen.getByTestId('form-delete');
    const textarea = screen.queryByTestId('form-textarea')

    fireEvent.click(deleteSpan);
    expect(textarea).toBeNull();
  });

  test('textarea is rendered when post is selected', () => {
    render(<Form />);

    const postSpan = screen.getByTestId('form-post');
    fireEvent.click(postSpan);
    fireEvent.click(postSpan);
    const textarea = screen.getByTestId('form-textarea')

    expect(textarea).toBeInTheDocument();
  });

  test('textarea is rendered when put is selected', () => {
    render(<Form />);

    const putSpan = screen.getByTestId('form-put');
    fireEvent.click(putSpan);
    fireEvent.click(putSpan);
    const textarea = screen.getByTestId('form-textarea')

    expect(textarea).toBeInTheDocument();
  });

})
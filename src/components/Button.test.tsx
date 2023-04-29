import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with title', () => {
    render(<Button title="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('executes action on click', () => {
    const handleClick = jest.fn();
    render(<Button title="Click me" action={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has primary class when primary is true', () => {
    render(<Button title="Click me" primary />);
    expect(screen.getByText('Click me')).toHaveClass('primary_btn');
  });

  it('is disabled when disabled is true', () => {
    render(<Button title="Click me" disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
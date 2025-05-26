// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  // 1. Rendering & Props
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies className and style props', () => {
    render(
      <Button className="test-class" style={{ color: 'red' }}>
        Styled Button
      </Button>
    );
    const button = screen.getByText('Styled Button');
    expect(button).toHaveClass('test-class');
    expect(button).toHaveStyle('color: red');
  });

  it('defaults to type="button"', () => {
    render(<Button>Default Button</Button>);
    expect(screen.getByText('Default Button')).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('uses custom type prop', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
  });

  // 2. Interaction & Behavior
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    await user.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    await user.click(screen.getByText('Disabled Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('is disabled when disabled={true}', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  // 3. Accessibility
  it('has aria-label when provided', () => {
    render(<Button ariaLabel="Close">X</Button>);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  // 4. Edge Cases
  it('handles undefined onClick safely', async () => {
    const user = userEvent.setup();
    render(<Button>No onClick</Button>);
    await expect(() =>
      user.click(screen.getByText('No onClick'))
    ).not.toThrow();
  });

  it('works with empty children', () => {
    render(<Button children={undefined} />); // Explicitly pass undefined children
    expect(screen.getByRole('button')).toBeEmptyDOMElement();
  });
});
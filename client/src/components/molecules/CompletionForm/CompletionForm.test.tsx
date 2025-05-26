import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompletionForm from './CompletionForm';

// Type-safe mocks
jest.mock('@components/atoms/Button', () => ({
  __esModule: true,
  default: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock('@components/atoms/Input', () => ({
  __esModule: true,
  default: ({
    placeholder,
    onChange,
    value,
  }: {
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  }) => (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      data-testid="mock-input"
    />
  ),
}));

describe('CompletionForm', () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();
  const mockChange = jest.fn();

  beforeEach(() => {
    render(
      <CompletionForm
        completionMessage="Test message"
        onCompletionMessageChange={mockChange}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );
  });

  it('renders input field with correct props', () => {
    const input = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe('Describe your work');
    expect(input.value).toBe('Test message');
  });

  it('triggers onChange when typing', async () => {
    const input = document.querySelector('input')!;
    await userEvent.type(input, 'new text');
    expect(mockChange).toHaveBeenCalledTimes(8); // 'new text' = 8 keystrokes
  });

  it('triggers onSubmit on button click', async () => {
    const submitButton = document.querySelector('button:first-of-type')!;
    await userEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('triggers onCancel on button click', async () => {
    const cancelButton = document.querySelector('button:last-of-type')!;
    await userEvent.click(cancelButton);
    expect(mockCancel).toHaveBeenCalled();
  });
});

//components/organisms/SessionTimeout/SessionTimeout.tsx

import { render, screen, act, fireEvent } from '@testing-library/react';
import { SessionTimeout } from './SessionTimeout';
import '@testing-library/jest-dom';

jest.useFakeTimers();
const mockLogout = jest.fn();
const mockExtendSession = jest.fn();

describe('SessionTimeout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // SessionTimeout.test.tsx
  it('shows the timeout modal with countdown', () => {
    render(<SessionTimeout onLogout={mockLogout} timeout={1000} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Updated queries
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByText(/session expiring soon/i)).toBeInTheDocument();

    expect(
      screen.getByText(/you'll be logged out in \d+ seconds/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /extend session/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /log out now/i })
    ).toBeInTheDocument();
  });

  it('calls onLogout when countdown finishes', () => {
    render(
      <SessionTimeout
        onLogout={mockLogout}
        timeout={1000}
        countdownDuration={5} // Short countdown for testing
      />
    );

    act(() => {
      jest.advanceTimersByTime(1000); // Show modal
      jest.advanceTimersByTime(5000); // Wait for countdown
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  it('resets timer when "Extend Session" is clicked', () => {
    render(
      <SessionTimeout
        onLogout={mockLogout}
        onExtendSession={mockExtendSession}
        timeout={1000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(1000); // Show modal
    });

    fireEvent.click(screen.getByRole('button', { name: /extend session/i }));
    expect(mockExtendSession).toHaveBeenCalled();
  });
});




// We're testing three main scenarios:

// That the timeout modal appears with the correct content after the timeout period

// That the logout function is called when the countdown completes

// That clicking "Extend Session" calls the extend function
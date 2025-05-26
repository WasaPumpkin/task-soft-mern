
//src/components/organisms/SessionTimeout/SessionTimeout.tsx
import React from 'react';
import { useSessionTimer } from './useSessionTimer';
import { SessionTimeoutProps } from './types';
import './SessionTimeout.css'; 

export const SessionTimeout: React.FC<SessionTimeoutProps> = ({
  onLogout,
  onExtendSession,
  timeout = 25 * 60 * 1000,
  countdownDuration = 60,
}) => {
  const { showModal, countdownLeft, resetTimer } = useSessionTimer({
    timeout,
    countdown: countdownDuration,
    onLogout,
    onExtendSession,
  });

  return (
    <div
      className={`modal-overlay ${showModal ? 'visible' : 'hidden'}`}
      role="dialog"
      aria-labelledby="session-timeout-heading"
      aria-modal="true"
    >
      <div className="modal-content">
        <h2 id="session-timeout-heading">Session Expiring Soon</h2>
        <p>
          You'll be logged out in {countdownLeft} seconds due to inactivity.
        </p>
        <div className="modal-buttons">
          <button className="extend-button" onClick={resetTimer}>
            Extend Session
          </button>
          <button className="logout-button" onClick={onLogout}>
            Log Out Now
          </button>
        </div>
      </div>
    </div>
  );
};

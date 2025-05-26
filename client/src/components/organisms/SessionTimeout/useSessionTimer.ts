import { useState, useEffect } from 'react';
import { UseSessionTimerParams } from './types';

export const useSessionTimer = ({
  timeout = 25 * 60 * 1000, // 25min
  countdown = 60, // 60s
  onLogout,
  onExtendSession,
}: UseSessionTimerParams) => {
  const [showModal, setShowModal] = useState(false);
  const [countdownLeft, setCountdownLeft] = useState(countdown);

  const resetTimer = async () => {
    setShowModal(false);
    setCountdownLeft(countdown);
    if (onExtendSession) await onExtendSession();
  };

  useEffect(() => {
    const events = ['mousedown', 'keypress', 'scroll'];
    const handleActivity = () => resetTimer();

    events.forEach((e) => window.addEventListener(e, handleActivity));

    const inactivityTimer = setTimeout(() => {
      setShowModal(true);
    }, timeout);

    const countdownInterval = setInterval(() => {
      setCountdownLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      clearTimeout(inactivityTimer);
      clearInterval(countdownInterval);
    };
  }, [timeout, countdown]);

  useEffect(() => {
    if (countdownLeft === 0) onLogout();
  }, [countdownLeft, onLogout]);

  return { showModal, countdownLeft, resetTimer };
};

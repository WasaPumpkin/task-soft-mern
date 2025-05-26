export interface SessionTimeoutProps {
  onLogout: () => void;
  onExtendSession?: () => Promise<void>;
  timeout?: number; // milliseconds (default: 25min)
  countdownDuration?: number; // seconds (default: 60s)
}

export interface UseSessionTimerParams {
  timeout: number;
  countdown: number;
  onLogout: () => void;
  onExtendSession?: () => Promise<void>;
}

// AppStateWatcher.js
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

interface OpenAppDetectionProps {
  func: () => void;
}

export default function OpenAppDetection({ func }: OpenAppDetectionProps) {
  const [appState, setAppState] = useState(AppState.currentState);
  const [hasLaunched, setHasLaunched] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (!hasLaunched && nextState === 'active') {
        setHasLaunched(true);
        func();
      } else if (hasLaunched && nextState === 'active' && appState.match(/background|inactive/)) {
        func();
      }
      setAppState(nextState);
    });

    return () => subscription.remove();
  }, [appState]);

  return null;
}

import { useState, useCallback } from 'react';

export function useGameState<T>(initialState: T) {
  const [state, setState] = useState(initialState);
  
  const updateState = useCallback((newState: Partial<T>) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  return [state, updateState] as const;
}
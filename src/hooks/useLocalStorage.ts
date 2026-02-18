import { useState, useEffect } from 'react';
import { AppState } from '../types';

const STORAGE_KEY = 'mi-gusto-pedidos';

const initialState: AppState = {
  contadorActual: 1,
  enPreparacion: [],
  aRetirar: [],
};

export function useLocalStorage() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [state]);

  return [state, setState] as const;
}

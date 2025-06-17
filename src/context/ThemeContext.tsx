// src/context/ThemeContext.tsx
import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { storageService } from '../services/storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  isDark: boolean;
}

interface ThemeContextType extends ThemeState {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

type ThemeAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_IS_DARK'; payload: boolean };

const getSystemTheme = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialTheme = (): Theme => {
  return storageService.get<Theme>('theme', 'system') || 'system';
};

const calculateIsDark = (theme: Theme): boolean => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme === 'dark';
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
  isDark: calculateIsDark(getInitialTheme()),
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
        isDark: calculateIsDark(action.payload),
      };
    case 'SET_IS_DARK':
      return {
        ...state,
        isDark: action.payload,
      };
    default:
      return state;
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Listen for system theme changes
  useEffect(() => {
    if (state.theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_IS_DARK', payload: e.matches });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [state.theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (state.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.isDark]);

  const setTheme = (theme: Theme): void => {
    dispatch({ type: 'SET_THEME', payload: theme });
    storageService.set('theme', theme);
  };

  const toggleTheme = (): void => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const value: ThemeContextType = {
    ...state,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
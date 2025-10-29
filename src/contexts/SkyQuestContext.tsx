import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { SkyQuestAPI, SessionWithDetails, SkyQuestMode } from '../api/skyquest';

// Types
export interface SkyQuestState {
  mode: 'calm' | 'energetic' | null;
  sessionId: string | null;
  sessionData: SessionWithDetails | null;
  modes: SkyQuestMode[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

export type SkyQuestAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MODES'; payload: SkyQuestMode[] }
  | { type: 'SET_SESSION'; payload: SessionWithDetails }
  | { type: 'CLEAR_SESSION' }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'UPDATE_PROGRESS'; payload: { stepId: string; status: string } };

// Initial state
const initialState: SkyQuestState = {
  mode: null,
  sessionId: null,
  sessionData: null,
  modes: [],
  loading: false,
  error: null,
  initialized: false,
};

// Reducer
function skyQuestReducer(state: SkyQuestState, action: SkyQuestAction): SkyQuestState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_MODES':
      return { ...state, modes: action.payload };
    
    case 'SET_SESSION':
      return {
        ...state,
        sessionData: action.payload,
        sessionId: action.payload.session.id,
        mode: action.payload.mode.key,
        error: null,
        loading: false,
      };
    
    case 'CLEAR_SESSION':
      return {
        ...state,
        sessionData: null,
        sessionId: null,
        mode: null,
      };
    
    case 'SET_INITIALIZED':
      return { ...state, initialized: action.payload };
    
    case 'UPDATE_PROGRESS':
      if (!state.sessionData) return state;
      
      const updatedSteps = state.sessionData.steps.map(step =>
        step.id === action.payload.stepId
          ? { ...step, status: action.payload.status as any }
          : step
      );
      
      const completed = updatedSteps.filter(s => s.status === 'done' || s.status === 'verified').length;
      
      return {
        ...state,
        sessionData: {
          ...state.sessionData,
          steps: updatedSteps,
          totals: {
            ...state.sessionData.totals,
            completed,
          },
        },
      };
    
    default:
      return state;
  }
}

// Context
interface SkyQuestContextType {
  state: SkyQuestState;
  dispatch: React.Dispatch<SkyQuestAction>;
  // Actions
  loadModes: () => Promise<void>;
  startSession: (modeKey: 'calm' | 'energetic') => Promise<void>;
  loadSession: (sessionId?: string) => Promise<void>;
  updateProgress: (stepId: string, status: string, proofUrl?: string, note?: string) => Promise<void>;
  switchMode: (targetModeKey: 'calm' | 'energetic') => Promise<void>;
  clearSession: () => void;
  initialize: () => Promise<void>;
}

const SkyQuestContext = createContext<SkyQuestContextType | undefined>(undefined);

// Provider
interface SkyQuestProviderProps {
  children: ReactNode;
}

export function SkyQuestProvider({ children }: SkyQuestProviderProps) {
  const [state, dispatch] = useReducer(skyQuestReducer, initialState);

  // LocalStorage keys
  const STORAGE_KEYS = {
    SESSION_ID: 'skyquest.sessionId',
    MODE: 'skyquest.mode',
  };

  // Save to localStorage
  const saveToStorage = (sessionData: SessionWithDetails) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionData.session.id);
      localStorage.setItem(STORAGE_KEYS.MODE, sessionData.mode.key);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  };

  // Load from localStorage
  const loadFromStorage = () => {
    try {
      const sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
      const mode = localStorage.getItem(STORAGE_KEYS.MODE) as 'calm' | 'energetic' | null;
      return { sessionId, mode };
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
      return { sessionId: null, mode: null };
    }
  };

  // Clear localStorage
  const clearStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
      localStorage.removeItem(STORAGE_KEYS.MODE);
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  };

  // Actions
  const loadModes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const modes = await SkyQuestAPI.getModes();
      dispatch({ type: 'SET_MODES', payload: modes });
      
      // Check if we're using fallback data (indicates offline mode)
      if (modes.length === 2 && modes.every(mode => 
        mode.id === 'journey-calm' || mode.id === 'journey-dynamic'
      )) {
        console.info('SkyQuest running in offline mode with fallback data');
        // Optionally show a subtle notification to user about offline mode
      }
      
      // Clear any previous errors if modes loaded successfully
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('Error loading SkyQuest modes:', error);
      // Don't set error state here as getModes() provides fallback data
      // The "Offline" message in console is expected behavior when Supabase is not configured
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const startSession = async (modeKey: 'calm' | 'energetic') => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const sessionData = await SkyQuestAPI.startSession(modeKey);
      dispatch({ type: 'SET_SESSION', payload: sessionData });
      saveToStorage(sessionData);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to start session' });
    }
  };

  const loadSession = async (sessionId?: string) => {
    const targetSessionId = sessionId || state.sessionId;
    if (!targetSessionId) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const sessionData = await SkyQuestAPI.getSession(targetSessionId);
      dispatch({ type: 'SET_SESSION', payload: sessionData });
      saveToStorage(sessionData);
    } catch (error) {
      // If session not found or invalid, clear it
      clearSession();
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to load session' });
    }
  };

  const updateProgress = async (stepId: string, status: string, proofUrl?: string, note?: string) => {
    if (!state.sessionId) {
      dispatch({ type: 'SET_ERROR', payload: 'No active session' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await SkyQuestAPI.updateProgress(state.sessionId, stepId, status as any, proofUrl, note);
      
      // Update local state
      dispatch({ type: 'UPDATE_PROGRESS', payload: { stepId, status } });
      
      // Reload session to get updated points and unlocked steps
      await loadSession();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to update progress' });
    }
  };

  const switchMode = async (targetModeKey: 'calm' | 'energetic') => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const sessionData = await SkyQuestAPI.switchMode(targetModeKey);
      dispatch({ type: 'SET_SESSION', payload: sessionData });
      saveToStorage(sessionData);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to switch mode' });
    }
  };

  const clearSession = () => {
    dispatch({ type: 'CLEAR_SESSION' });
    clearStorage();
  };

  const initialize = async () => {
    if (state.initialized) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Load modes first
      await loadModes();
      
      // Try to restore session from localStorage
      const { sessionId } = loadFromStorage();
      if (sessionId) {
        try {
          // Check if there's an active session
          const activeSession = await SkyQuestAPI.getActiveSession();
          if (activeSession) {
            dispatch({ type: 'SET_SESSION', payload: activeSession });
            saveToStorage(activeSession);
          } else {
            // Clear invalid session from storage
            clearStorage();
          }
        } catch (error) {
          // Clear invalid session from storage
          clearStorage();
        }
      }
      
      dispatch({ type: 'SET_INITIALIZED', payload: true });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to initialize' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Initialize on mount
  useEffect(() => {
    initialize();
  }, []);

  // Auto-save to localStorage when session changes
  useEffect(() => {
    if (state.sessionData) {
      saveToStorage(state.sessionData);
    }
  }, [state.sessionData]);

  const contextValue: SkyQuestContextType = {
    state,
    dispatch,
    loadModes,
    startSession,
    loadSession,
    updateProgress,
    switchMode,
    clearSession,
    initialize,
  };

  return (
    <SkyQuestContext.Provider value={contextValue}>
      {children}
    </SkyQuestContext.Provider>
  );
}

// Hook
export function useSkyQuest() {
  const context = useContext(SkyQuestContext);
  if (context === undefined) {
    throw new Error('useSkyQuest must be used within a SkyQuestProvider');
  }
  return context;
}
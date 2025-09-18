/// <reference types="vite/client" />

// Declare PheChat global object
declare global {
  interface Window {
    PheChat?: {
      open: () => void;
      close: () => void;
    };
  }
}
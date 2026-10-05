import { createContext, useContext } from 'react';

/** Counts the times the list has switched between rows and tiles; entries redraw on each. */
export const EntryRedrawContext = createContext(0);

export const useEntryRedraw = () => useContext(EntryRedrawContext);

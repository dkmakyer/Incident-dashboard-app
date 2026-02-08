import { createContext } from 'react';
import type { IncidentContextType } from './IncidentContextType';


export const IncidentContext = createContext<IncidentContextType | undefined>(undefined);


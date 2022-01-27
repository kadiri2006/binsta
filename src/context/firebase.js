import { createContext, useContext } from "react";

export const FireBaseContext = createContext(null);

export const useFireBaseContext = () => useContext(FireBaseContext);

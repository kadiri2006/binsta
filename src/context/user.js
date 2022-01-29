import { createContext, useContext } from "react";

const UserContext = createContext(null);
const useUserContext = () => useContext(UserContext);

export { UserContext, useUserContext };

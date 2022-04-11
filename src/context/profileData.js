import { createContext, useContext } from "react";

let ProfileData = createContext(null);
let useProfileData = () => useContext(ProfileData);
export { ProfileData, useProfileData };

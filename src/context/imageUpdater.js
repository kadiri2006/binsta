import { createContext } from "react";
import { useContext } from "react";

const ImageUpdater = createContext(null);
const useImageUpdater = () => useContext(ImageUpdater);

export { ImageUpdater, useImageUpdater };

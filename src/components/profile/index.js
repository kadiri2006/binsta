import React, { useState } from "react";
import { ImageUpdater } from "../../context/imageUpdater";

import Header from "./Header";
import Photos from "./Photos";

export default function Profile() {
  const [imageData, setImageData] = useState([]);

  return (
    <>
      <ImageUpdater.Provider value={{imageData,setImageData}}>
        <Header  />
        <Photos />
      </ImageUpdater.Provider>
    </>
  );
}

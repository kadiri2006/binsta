import React,{useRef} from "react";
import { PostContext } from "../../context/post";

import Actions from "./Actions";

import Comments from "./comments";
import Footer from "./footer";
import Header from "./Header";
import Image from "./Image";


export default function Post({ photo }) {
  // console.log(photo);

  const inputRef = useRef(null)
                

  return (
    <PostContext.Provider value={photo}>
      <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
        <Header username={photo.username} />
        <Image src={photo.imageSrc} caption={photo.caption} />
        <Actions photo={photo} inputRef={inputRef} />
        <Footer />
        <Comments inputRef={inputRef} />
      </div>
    </PostContext.Provider>
  );
}



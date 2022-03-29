import React from "react";
import Actions from "./Actions";
import Header from "./Header";
import Image from "./Image";

export default function Post({ photo }) {
  console.log(photo);

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <Header username={photo.username} />
      <Image src={photo.imageSrc} caption={photo.caption} />
      <Actions/>
    </div>
  );
}

Post.prototype = {
  photo: window.PropTypes.shape({
    /* username: window.PropTypes.string.isRequired,
    imageSrc: window.PropTypes.string.isRequired,
    likes: window.PropTypes.arrayOf(window.PropTypes.string).isRequired,
    dateCreated: window.PropTypes.number.isRequired, */
  }),
};

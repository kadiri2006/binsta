import React from "react";
import Header from "./Header";

export default function Post({ photo }) {
  console.log(photo);

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <Header username={photo.username} />
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

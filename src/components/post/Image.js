import React from "react";

export default function Image({ src, caption }) {
  return <img src={src} alt={caption} />;
}

Image.prototype = {
  src: window.PropTypes.string.isRequired,
  caption: window.PropTypes.number.isRequired,
};

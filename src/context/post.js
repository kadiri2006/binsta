import React from "react";

const PostContext = React.createContext();
const usePostContext = () => React.useContext(PostContext);

export { PostContext, usePostContext };

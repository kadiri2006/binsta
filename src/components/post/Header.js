import React,{useState} from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE_PATH } from "../../constants/routes";
import { usePostContext } from "../../context/post";
import { getUserDoc } from "../../services/firebase";

export default function Header({ username }) {

  let [postUserImg, setPostUserImg] = useState(null);
   getUserDoc(false,username).then((data)=>setPostUserImg(data[0].profileImg))
    // console.log(postUserImg);
  
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          {postUserImg ? (
            <img
              className="rounded-full h-8 w-8 flex mr-3"
              src={postUserImg}
              alt={`${username} profile picture`}
              onError={(e)=>e.target.src=DEFAULT_IMAGE_PATH}
            />
          ) : (
            <Skeleton count={1} height={150} className="mt-5" />
          )}
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.prototype = {
  username: window.PropTypes.number.isRequired,
};

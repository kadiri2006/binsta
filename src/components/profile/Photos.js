import { data } from "autoprefixer";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useImageUpdater } from "../../context/imageUpdater";
import { useProfileData } from "../../context/profileData";
import { getPostedImgData } from "../../services/firebase";

export default function Photos() {
  let {
    profile: { userName, profileId },
  } = useProfileData();

  let [photosData, setPhotosData] = React.useState([]);
  // console.log(photosData);
  // console.log(profile);
  // let { photoCount, userName } = useProfileData();
  // let x= useProfileData();
  // console.log(profileId);

  let { imageData } = useImageUpdater();
  // console.log("at photos", imageData);

  useEffect(() => {
    // console.log(profileId);
    // console.log("image data updated at useEffect");

    if (profileId) {
      let imagesData = [];
      getPostedImgData(profileId)
        .then((x) => {
          for (let index = 0; index < x.length; index++) {
            let data = {};
            data.imgURL = x[index].imageSrc;
            data.likes = x[index].likes;
            data.comments = x[index].comments;
            imagesData.push(data);
          }

          // console.log(x);
        })
        .finally(() => {
          setPhotosData(imagesData);
          // console.log(imagesData);
        });
    }
  }, [profileId, imageData]);

  // console.log(userName);
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      {photosData.length > 0 ? (
        <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
          {photosData.map((data, key) => (
            <div className="relative group" key={key}>
              <img src={data.imgURL} className="group-hover:opacity-50" />

              <div className="absolute bottom-0 left-0  z-10 w-full justify-evenly items-center h-full  group-hover:flex hidden">
                <p className="flex items-center text-black font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-8 mr-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {data.likes.length}
                </p>

                <p className="flex items-center text-black font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-8 mr-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {data.comments.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : userName ? (
        <p className="text-center text-2xl">No Posts Yet</p>
      ) : (
        <Skeleton count={1} height={300} className="mt-5" />
      )}
    </div>
  );
}

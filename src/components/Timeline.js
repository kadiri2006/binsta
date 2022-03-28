import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
  const { photos } = usePhotos();

  // photos && console.log(photos);

  return (
    <div className="container col-span-2">
      {photos ? (
        photos.length > 0 ? (
          photos.map((photo) => (
            <Post photo={photo} key={photo.imgdocId} />
          ))
        ) : (
          <p>follow persons</p>
        )
      ) : (
        <Skeleton count={4} height={500} width={640} className="mb-5" />
      )}
    </div>
  );
}

import React, { useRef, useEffect } from "react";
import { useImageUpdater } from "../../context/imageUpdater";
import { createPost } from "../../services/firebase";

export default function Dialog({ dialog, profileId }) {
  const inputRef = useRef(null);
  // console.log(inputRef);

  let { setImageData } = useImageUpdater();

  useEffect(() => {
    dialog.value && inputRef.current.showModal();
  }, [dialog]);

  let formSubmitted = (e) => {
    // console.log(e.target);
    let formData = new FormData(e.target);
    // console.log(formData.get("file"));
    formData.append("upload_preset", "instagram");

    console.log(formData.get("file"));

    fetch("https://api.cloudinary.com/v1_1/kadiricloud/image/upload", {
      method: "post",
      body: formData,
    })
      .then((x) => x.json())
      .then((data) => {
        let caption = formData.get("caption");
        let dateCreated = new Date(data.created_at).getTime();
        let userId = profileId;
        let imageSrc = data.url;
        let comments = [];
        let likes = [];
        createPost({
          caption,
          dateCreated,
          userId,
          imageSrc,
          comments,
          likes,
        })
          .then((x) => console.log(`posted sucessfully`, x))
          .then((x) => setImageData([]))
          .catch((x) => console.log(x));
      })

      .catch((x) => console.log(x));
  };

  return (
    <>
      <dialog ref={inputRef}>
        <form
          method="dialog"
          onSubmit={formSubmitted}
          className="flex flex-col"
        >
          <button
            type="button"
            onClick={() => inputRef.current.close()}
            className="self-end text-red-700 text-2xl"
          >
            X
          </button>
          <label htmlFor="svg" className=" self-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-10 h-10 fill-blue-400"
            >
              <g>
                <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                <circle cx="8.868" cy="8.309" r="1.542"></circle>
              </g>
            </svg>
            <input type="file" name="file" id="svg" className="hidden" />
          </label>

          <textarea
            id="caption"
            name="caption"
            cols="30"
            rows="5"
            className="border-2 shadow-md m-2 p-5 border-blue-400 placeholder:text-blue-300"
            placeholder="Image Caption.it will be displayed in your posted image below "
          ></textarea>
          <button
            type="submit"
            className="bg-blue-400 self-center p-3 rounded-xl text-white"
          >
            submit
          </button>
        </form>
      </dialog>
    </>
  );
}

import React, { useRef,useEffect } from 'react'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const ImageUplaod = ({
  imageFile,
  setimageFile,
  setuploadImg,
  setisloading,
  showInput,
  imageType = "thumbnail",
}) => {
  const inputRef = useRef(null);
  const { user } = useAuth();

  const handelImgFile = (e) => {
    const selectedImg = e.target.files?.[0];
    if (selectedImg) setimageFile(selectedImg);
  };

  const handleImageUpload = async () => {``
    setisloading(true);
    const data = new FormData();
    data.append(imageType, imageFile);

    const endpoint =
      imageType === "thumbnail"
        ? `${import.meta.env.VITE_BACKEND_API_URL}/api/posts/image`
        : `${import.meta.env.VITE_BACKEND_API_URL}/api/users/image`;
     
    const res = await axios.post(endpoint,data,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (res.data.success) {
      setuploadImg(res.data.data);
      setisloading(false);
      console.log(res.data.data)
    }
  };

  useEffect(() => {
    if (imageFile) {
      handleImageUpload();
    }
  }, [imageFile]);

  return (
    <div>
      <input
        type="file"
        id="imgaeUpload"
        onChange={handelImgFile}
        ref={inputRef}
        className={`${showInput ? "hidden" : "block"}`}
      />
    </div>
  );
};

export default ImageUplaod
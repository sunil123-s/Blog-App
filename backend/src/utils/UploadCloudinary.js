import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new multer.memoryStorage();

export const ImageUpload = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder:"blogapp"
  });
  return result;
};

export const ImageDelete = async(prevImg) => {
  const publicId = prevImg.replace(`/blogapp/`,'').split(".")[0];
  const result = await cloudinary.uploader.destroy(publicId)
  return result;
}

const upload = multer({ storage });
export default upload;


import express from "express";
import { proctedRoute } from "../middleware/auth.js";
import upload from "../utils/UploadCloudinary.js";
import {
  createPost,
  deletePost,
  editPost,
  getAllPost,
  getPostByAuthors,
  getPostByCategory,
  getSinglePost,
} from "../controllers/postController.js";
import { changeAvatar } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/create", proctedRoute,createPost);
router.post("/image",proctedRoute,upload.single("thumbnail"), changeAvatar)
router.get("/allpost", getAllPost);
router.get("/getPost/:id", getSinglePost);
router.get("/category/:category", getPostByCategory);
router.get("/authors/:id", getPostByAuthors);
router.put("/edit-post/:id", proctedRoute, editPost);
router.delete("/:id",proctedRoute, deletePost);

export default router;
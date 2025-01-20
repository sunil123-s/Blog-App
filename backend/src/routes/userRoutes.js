import express from "express"
import { changeAvatar, editUser, getAllUsers, getUesr, LoginUser, registerUser } from "../controllers/userControllers.js"
import upload from "../utils/UploadCloudinary.js"
import { proctedRoute } from "./../middleware/auth.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/image", upload.single("avatar"), changeAvatar);
router.post("/login", LoginUser)
router.get("/", getAllUsers)
router.get("/author/:id", getUesr);
router.post("/image",upload.single("avatar"),changeAvatar);
router.put("/edit-user/:id", editUser)

export default router
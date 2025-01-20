import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectdb } from "./config/database.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

dotenv.config()
const PORT = process.env.PORT;

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes)

connectdb().then(() => {
    console.log("Mongodb Connected")
    app.listen(PORT, () => console.log(`server is running on ${PORT}`))
}).catch((error) => {
  console.error("Failed to connect to MongoDB:", error.message);
})

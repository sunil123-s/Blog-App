import mongoose, { Schema } from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Agriculture",
        "Business",
        "Education",
        "Entertainment",
        "Uncategorized",
        "Wildlife",
      ],
    },
    thumbnail: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);  

const Post = mongoose.model("Post", PostSchema)
export default Post;
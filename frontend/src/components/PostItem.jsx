
import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({ item }) => {

  const shortDescription =
    item.description.length > 145
      ? item.description.slice(0, 145) + "..."
      : item.description;
  const shortTitle =
    item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col mx-10 md:mx-10 lg:mx-10">
      <div className="w-full h-48 md:h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          src={item?.thumbnail ? item?.thumbnail : "/profilelogo.png"}
          alt={item.title}
        />
      </div>
      <div className="p-4 flex-grow">
        <Link to={`/posts/${item._id}`} className="block mb-2">
          <h3 className="font-bold text-lg md:text-xl text-gray-800 hover:text-blue-500 transition-colors duration-200">
            {shortTitle}
          </h3>
        </Link>

        <p
          className="text-gray-600 text-sm md:text-base mb-4"
          dangerouslySetInnerHTML={{ __html: shortDescription }}
        ></p>

        <div className="flex justify-between items-center mt-auto">
          <PostAuthor createdAt={item?.createdAt} creator={item?.creator} />
          <Link
            to={`/posts/categories/${item?.category}`}
            className="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-200 text-sm md:text-base"
          >
            {item.category}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

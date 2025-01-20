import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../../store/thunk/authThunk/authThunks";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
     setisLoading(true)
     dispatch(fetchAllUsers()).then((data) => {
      if(data.payload.success){
        setAuthors(data.payload.data)
        setisLoading(false)
      }
     })
  }, [dispatch])
  

  return (
    <div className="max-w-6xl mx-auto rounded-xl pt-28 min-h-screen">
      <div>
        {isLoading && <h1 className="text-center text-gray-600">Loading...</h1>}
        {!isLoading && authors.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {authors.map((item) => (
              <Link
                key={item.id}
                to={`/posts/users/${item?._id}`}
                className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 border-4 border-gray-200 rounded-full overflow-hidden">
                  <img
                    src={item.avatar ? item.avatar : "/12.png"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-lg font-bold text-gray-800">
                    {item?.name}
                  </h4>
                  <p className="text-sm text-gray-600">{item?.posts} posts</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 mt-60 font-bold text-4xl text-center">
            No Author Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Authors;

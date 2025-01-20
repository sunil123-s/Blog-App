
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { useDispatch } from 'react-redux';
import { getUser } from '../store/thunk/authThunk/authThunks';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru)

const PostAuthor = ({ createdAt , creator}) => {
   const [author, setauthor] = useState(null)

   const dispatch = useDispatch()
 
   useEffect(() => {
      dispatch(getUser(creator)).then((data) => {
        if(data.payload.success){
          setauthor(data.payload.data)
        }
      })
   }, [creator])
   
  
  return (
    <div className="">
      <Link to={`/posts/users/${creator}`} className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg border overflow-hidden aspect-auto">
          <img src={author?.avatar ? author.avatar : "/12.png"} alt="" />
        </div>
        <div className="text-xs">
          <h5 className="font-bold">By: {author?.name}</h5>
          {createdAt && (
            <h5>
              <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
            </h5>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostAuthor
import React from "react";
import PostAuthor from "./PostAuthor"
import { Link } from "react-router-dom";

const PostItem = ({postId,_id,thumbnail,creator,title,desc,authorId,category}) => {
  const shortDesc = desc.length > 100 ?desc.substring(0,100)+"..." :desc;
  const postTitle = title.length > 30 ? title.substring(0,30)+"..." :title
  return (
  
   
      <div key={_id} class="md:min-w-64 min-w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <img
            class="rounded-t-lg h-40  w-full md:min-w-full  object-cover p-2 rounded-md"
            src={`http://localhost:4000/uploads/${thumbnail}`}
            alt=""
          />
    
        <div class="p-5 relative">
          <Link to={`/posts/${postId}`}>
            <h5 class=" text-md font-extrabold tracking-tight text-gray-900 dark:text-white">
              {postTitle}
            </h5>
          </Link>
          <p class="mb-3 text-md font-normal text-gray-700 dark:text-gray-400">
            {shortDesc}
          </p>
          
          <div className="posts-author w-full mb-5 ">
            <PostAuthor creator={creator} authorId={authorId}/>
           
          </div>
          <div className="mt-5  absolute right-4 bottom-3 ">
            <Link   to={`posts/categories/${category}`}><small className="text-md font-semibold bg-indigo-300 text-zinc-600 px-2 py-1 rounded-md  ">{category}</small></Link>
            </div>
        </div>
      </div>
    
  );
};

export default PostItem;

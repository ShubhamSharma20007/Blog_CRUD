import React from "react";
import PostAuthor from "./PostAuthor"
import { Link } from "react-router-dom";
import striptags from "striptags";
const PostItem = ({postId,_id ,authorId,thumbnail,createdAt, creator,title,desc,category}) => {
  
  const shortDesc = desc.length > 100 ?desc.substring(0,50)+"..." :desc;
  const postTitle = title.length > 30 ? title.substring(0,20)+"..." :title
  return (
  
      <div key={_id} class="md:min-w-64 mx-auto  w-[20rem] min-w-full flex flex-col justify-between  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img
            class="rounded-t-lg h-40  w-full md:min-w-full  object-cover p-2 rounded-md"
            src={`${process.env.REACT_APP_ASSET_URL}/${thumbnail}`}
            alt=""
          />
  
        <div class="px-5 py-3 relative flex flex-col justify-between">
          <Link to={`/posts/${postId}`}>
            <h5 class=" text-md font-extrabold tracking-tight text-gray-900 dark:text-white">
              {postTitle}
            </h5>
 
          <p class="mb-3 text-md font-normal text-gray-700 dark:text-gray-400">
         {striptags(shortDesc)}
          </p>
          </Link>
          
          <div className="posts-author w-full  ">
            <PostAuthor creator={creator} createdAt={createdAt} authorId={authorId}/>
            <div className="mt-5  absolute right-4 bottom-3 ">
            <Link   to={`/posts/categories/${category}`}><small className="text-md font-semibold bg-indigo-300 text-zinc-600 px-2 py-1 rounded-md  ">{category}</small></Link>
            </div>
          </div>
          
        </div>
      </div>
    
  );
};

export default PostItem;

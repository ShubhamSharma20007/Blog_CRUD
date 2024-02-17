import React from "react";
import PostAuthor from "./PostAuthor"
import { Link } from "react-router-dom";

const PostItem = ({postId,id,thumbnail,title,desc,authorId,category}) => {
  const shortDesc = desc.length > 100 ?desc.substring(0,100)+"..." :desc;
  const postTitle = title.length > 30 ? title.substring(0,30)+"..." :title
  return (
  
   
      <div key={id} class="md:min-w-64 min-w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <img
            class="rounded-t-lg h-40  w-full md:min-w-full  object-cover p-2 rounded-md"
            src={thumbnail}
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
          {/* <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a> */}
          <div className="posts-author w-full mb-5 ">
            <PostAuthor/>
           
          </div>
          <div className="mt-5  absolute right-4 bottom-3 ">
            <Link   to={`posts/categories/${category}`}><small className="text-md font-semibold bg-indigo-300 text-zinc-600 px-2 py-1 rounded-md  ">{category}</small></Link>
            </div>
        </div>
      </div>
    
  );
};

export default PostItem;

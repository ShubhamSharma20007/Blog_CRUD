import React from "react";
import Avatar1 from "../assets/avatar1.jpg";
import Avatar2 from "../assets/avatar2.jpg";
import Avatar3 from "../assets/avatar3.jpg";
import Avatar4 from "../assets/avatar4.jpg";
import Avatar5 from "../assets/avatar5.jpg";

const Author = () => {
  const authorData = [
    { id: 1, avatar: Avatar1, name: "Suresh Kumar", posts: 3 },
    { id: 2, avatar: Avatar2, name: "Akshay Kumar", posts: 3 },
    { id: 3, avatar: Avatar3, name: "Jay yadav", posts: 3 },
    { id: 4, avatar: Avatar4, name: "Sumit Debnath", posts: 3 },
    { id: 5, avatar: Avatar5, name: "Pushpa", posts: 3 },
  ];
  return (

     <div className="flex gap-5 flex-wrap m-3 justify-center  " >
      {authorData.length >0 && authorData.map(({id, avatar, name, posts}) => (
        <>
          <div key={id} class="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-end px-4 pt-4">
              <button
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
       
             
              </button>

              <div
                id="dropdown"
                class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul class="py-2" aria-labelledby="dropdownButton">
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Export Data
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col items-center pb-10">
              <img
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={avatar}
                alt="Bonnie image"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {name}
              </h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {
                  `Post Count : ${posts}`
                }
              </span>
            
            </div>
          </div>
        </>
      ))}
    </div>

  );
};

export default Author;

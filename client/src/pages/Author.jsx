import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader"
import Avatar from "../assets/avatar1.jpg"
const Author = () => {
  const [authorData, setAuthorData] = useState([]);
  const [loader,setLoader] = useState(true)
  useEffect(() => {
     try {
      const res = axios(`${process.env.REACT_APP_BASE_USER_URL}`)
      res.then(res=> res.data)
      .then(data => setAuthorData(data.rawData))
     } catch (error) {
      console.log(error)
     }
     finally{
      setLoader(false)
     }
  },[])


  return (

     <div className="flex gap-5 flex-wrap m-3 justify-center  " >
        {
          loader && <Loader/>
        }

      {authorData.length >0 && authorData.map(({id, avatar, name, posts}) => (
        <>
          <div key={id} class="py-2 w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
         
            <div class="flex flex-col items-center pb-10">
              <img
               onError={(e)=>{
                e.target.src = `${process.env.REACT_APP_ASSET_URL}/profileAvatar.jpg`
              }}
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={`${process.env.REACT_APP_ASSET_URL}/${avatar}`}
                
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

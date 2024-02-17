import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../assets/avatar1.jpg"
import { Link } from "react-router-dom";
import Thumbnail from "../assets/blog22.jpg"
const PostDetail = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <div className="flex justify-center  main-container w-full min-h-screen bg-indigo-200">
        <div className="md:w-1/2 w-full  rounded-md m-3 md:my-2 md:px-10 px-5 py-5  bg-white">
          <div className="flex justify-between">
            <div className="wrapper w-full flex gap-3  md:gap-5">
              <div>
                <img src={Avatar} alt="" className="w-12 rounded-full" />
              </div>
              <div className="">
                <h5 className="font-bold text-sm">By: Albert Eistin</h5>
                <small className="font-semibold ">Just now</small>
              </div>
            </div>
            <div className="buttons gap-2 md:gap-5 flex h-1/2 items-center justify-center m-auto">
             <Link to={`/posts/werwer/edit`}>
             <button className="bg-indigo-700 hover:bg-indigo-600  text-semibold text-white rounded-md px-3 py-1 m-0">Edit</button>
             </Link>
             <Link to={`/posts/werwer/delete`}>
             <button className="bg-red-700 hover:bg-red-600 text-white text-semibold rounded-md px-3 py-1">Delete</button>
             
             </Link>
            </div>
          </div>
          <div className="text-xs md:text-[16px] mt-5 mb-4 font-bold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, veritatis.
          </div>
          <div className="img-container h-72 border rounded-md">
      <img src={Thumbnail} alt=""  className="object-cover w-full h-full" />
          </div>
          <p className="text-md text-bold mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci nesciunt, tempora amet inventore ducimus porro quo, suscipit labore totam explicabo dolore pariatur deserunt repudiandae facere quos est. Harum, exercitationem temporibus? 
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dignissimos reiciendis cumque temporibus tempore amet excepturi obcaecati dolore, dolor molestias odio doloremque ipsam! Modi, facilis. Iste consectetur suscipit perspiciatis nihil.</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

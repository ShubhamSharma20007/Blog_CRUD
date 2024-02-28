import React, { useState } from "react";
import Avatar from "../assets/avatar2.jpg";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import Loader from "../components/Loader";
import axios from "axios";
const UserProfile = () => {
  const { id } = useParams();

  const { currentUser, user } = useContext(UserContext);
const[loader,setLoader] =useState(true)
  const [imgval, setImgval] = React.useState("");
  const [value, setValue] = useState({
    username: "",
    useremail: "",
    userpassword: "",
    confirmpassword: "",
  });

  // console.log(imgval.name)

  console.log(value);
  function handleChange(e) {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [isAvatarValue, setAvatarValue] = useState();

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleAvatarChange = async () => {
    try {
      const newForm = new FormData();
      newForm.append("avatar", imgval); // Use imgval instead of Avatar
  
      const res = await axios.post(
        `http://localhost:4000/change-avatar/${id}`,
        newForm,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Add Content-Type header for FormData
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
  
      // Assuming res.data contains the updated user data including the new avatar
      setAvatarValue(res.data.avatar);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        window.location.reload(); // Reload the page
      }, 2000); // Reload after 2 seconds
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  
  

  return (
    <div>
      {
        loader && <loader/>
      }
      <div className="w-full min-h-screen bg-indigo-100 flex justify-center ">
        <div className="w-full md:w-1/2 h-auto bg-white my-3 md:mx-0 mx-3 rounded-md p-5">
          <div className="w-full flex justify-center  ">
            <Link
              className="text-lg px-3 py-1 my-2 text-center font-bold bg-zinc-200 hover:bg-zinc-300 rounded-md"
              to={`/myposts/${id}`}
            >
              My Posts
            </Link>
          </div>
          <center className="relative">
            <div className="relative  w-fit">
              <img
              onError={(e)=>{
                e.target.src = `${process.env.REACT_APP_ASSET_URL}/profileAvatar.jpg`
              }}
                class="md:w-[120px] w-[100px] h-[100px] md:h-[120px] p-1 rounded-full ring-2 ring-zinc-300 my-3  dark:ring-gray-500"
                src={`${process.env.REACT_APP_ASSET_URL}/${user.avatar}`}
              />
              <div
                className=" absolute bottom-2 -right-[10px] bg-black p-2 rounded-full"
                onClick={handleAvatarChange}
              >
                <form action="">
                  <input
                    type="file"
                    name="avatar"
                    className="hidden"
                    id="avatar"
                    value=""
                    accept="png, jpg,jpeg"
                    onChange={(e) => setImgval(e.target.files[0])}
                  />
                  <label htmlFor="avatar">
                    <BsPencilSquare className="text-xl text-white cursor-default" />
                  </label>
                </form>
              </div>
            </div>
          </center>

          <div className="my-4 ">
            <h1 className="text-2xl text-center font-extrabold">
              {" "}
              {currentUser?.name}
            </h1>
          </div>

          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="text"
                class="block mb-2 text-sm  text-gray-900 dark:text-white font-bold"
              >
                Name
              </label>
              <input
                type="text"
                name="username"
                value={value.username}
                onChange={handleChange}
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name..."
                required=""
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="useremail"
                value={value.useremail}
                onChange={handleChange}
                id="userMail"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="xyz@gmail.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="userpassword"
                value={value.userpassword}
                onChange={handleChange}
                id="password"
                placeholder="New Password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                value={value.confirmpassword}
                onChange={handleChange}
                id="confirmpassword"
                placeholder="Confirm New  Password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-zinc-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update My Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

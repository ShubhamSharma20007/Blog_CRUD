import React from 'react'
import Avatar from "../assets/avatar1.jpg"
import { Link } from "react-router-dom";
import { useContext,useEffect } from 'react';
import {UserContext} from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from "../components/Loader"
import axios  from "axios"
const Dashboard = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const{ currentUser} = useContext(UserContext)
  const token =  currentUser?.token
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])


  // fetch the API
const [postdata,setPostdata] = React.useState([])
const [loader,setLoader] = React.useState(true)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_POST_URL}/users/${id}`) 
        setPostdata(res.data.userData)
      } catch (error) {
        console.log(error.response.data.message )
      }
      finally{
        setLoader(false)
      }
    }
    fetchData()
  },[id])
  console.log(postdata)
  
  const removeEntery = async(id)=>{
    try{
      const res = await axios.delete(`${process.env.REACT_APP_BASE_POST_URL}/posts/${id}`,{
        withCredentials:true,
        headers:{
          Authorization :`Bearer ${token}`
        }
      })
      if(res.status === 200){
        window.location.reload()
      }
    }
    catch (error) {
      console.log(error.response.data.message)
    }
    finally{
      setLoader(false)
    }
  }

  return (
    <div>
      {
        loader && <Loader/>
      }
       <div className="w-full min-h-screen bg-indigo-100 pt-1">
       <div class="w-full mt-4 max-w-[80%] mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    {
      postdata && postdata.map((post)=>{
        return(
          <div class="flex flex-wrap  items-center py-5 justify-between px-8 md:px-16">
      <div className="flex gap-5 items-center">
      <img class="w-12  ring-2  h-12 mb-3 rounded-full object-cover shadow-lg" src={`${process.env.REACT_APP_ASSET_URL}/${post.thumbnail}`} alt="Bonnie image"/>
        <h5 class="mb-1 text-md font-bold text-gray-900 dark:text-white">{post.title}</h5>
      </div>
        <div class="flex gap-4 md:mt-0 my-3 ">
        <Link to={`/posts/${post._id}`} class="inline-flex items-center px-4 py-2 text-sm font-bold  ">View</Link>
            <Link to={`/posts/${post._id}/edit`} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</Link>
            <Link to="#" class="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-700 rounded-lg border  hover:bg-red-600  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={()=>removeEntery(post._id)}>Delete</Link>
        </div>
    </div>
        )
      })
    }
</div>

       </div>
</div>
   
  )
}

export default Dashboard

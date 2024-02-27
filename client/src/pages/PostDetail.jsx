import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../assets/avatar1.jpg"
import { Link } from "react-router-dom";
import { useContext ,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import Loader from "../components/Loader";
import striptags from "striptags"
import axios from "axios";

const PostDetail = () => {
  const params = useParams()
  const {id} = params;
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  if(!token){
    navigate("/login");
  }

  const [loading,setLoading] = useState(true);

  // fetch the API
  const[posts,setPosts] = useState([])
  useEffect(()=>{
   async function fetchData(){
 try {
  const res = await  axios.get(`${process.env.REACT_APP_BASE_POST_URL}/${id}`)
  const data = res.data;
  setPosts(data.post);

 } catch (error) {
  console.log(error)
 }
 finally{
  setLoading(false)
 }
  }
    fetchData()
  },[])


   const removePost = async (id)=>{
try {
  const res = await axios.delete(`${process.env.REACT_APP_BASE_POST_URL}/posts/${id}`,{
    withCredentials:true,
    headers:{
      Authorization :`Bearer ${token}`
    }
   })

   if(res.status === 200){
    setTimeout(()=>{
      navigate("/")
    },0)
   }
} catch (error) {
  console.log(error.response.data.message)
}
finally{
  setLoading(false)
}
   }  
  

  return (
   
    <div>
      {
    loading && <Loader/>
   }
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
             <Link to={`/posts/${posts._id}/edit`}>
             <button className="bg-indigo-700 hover:bg-indigo-600  text-semibold text-white rounded-md px-3 py-1 m-0">Edit</button>
             </Link>
             <Link onClick={()=>removePost(id)}>
             <button className="bg-red-700 hover:bg-red-600 text-white text-semibold rounded-md px-3 py-1">Delete</button>
             
             </Link>
            </div>
          </div>
          <div className="text-xs md:text-[16px] mt-5 mb-4 font-bold">
  {striptags(posts.title)}
</div>
          <div className="img-container h-72 border rounded-md">
      <img src={`${process.env.REACT_APP_ASSET_URL}/${posts.thumbnail}`}  alt=""  className="object-cover w-full h-full" />
          </div>
          <p className="text-md text-bold mt-4" dangerouslySetInnerHTML={{__html:striptags(posts.description)}} >
          
      </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

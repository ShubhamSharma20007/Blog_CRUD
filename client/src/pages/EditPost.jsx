import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useContext,useEffect } from 'react';
import {UserContext} from '../Context/userContext';
import { useNavigate } from 'react-router-dom';

function EditPost() {
  const navigate = useNavigate()
  const{ currentUser} = useContext(UserContext)
  const token =  currentUser?.token
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  const [title,setTitle] = useState('')
  const [category,setCategory] = useState('')
  const [description,setDescription] = useState('')
  const [thumbnail,setThumbnail] = useState('')


  return (
    <div>
      <div className="w-full  bg-indigo-100 flex justify-center ">
   <div className="md:w-1/2 w-full md:mx-0 mx-3 h-auto bg-white my-3 rounded-md p-5 py-10">

    
      <div className='my-4 '>
        <h1 className='text-2xl text-center font-extrabold'> Edit Post</h1>
      </div>

      <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="text" class="block mb-2 text-sm  text-gray-900 dark:text-white font-bold">Name</label>
                      <input type="text" name="title" value={title}  onChange={(e)=>setTitle(e.target.value)}  id="title" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name..." required="" />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Email</label>
                      <select  name="category"  onChange={(e)=> setCategory(e.target.value)} value={category}  id="category" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz@gmail.com" required="">
                          {
                            ["Agriculture","Business","Education","Entertainment","Art","Inverstment","Uncategorized","Weather"].map((item,index)=>(
                              <option key={index} value="">{item}</option>
                            ))
                          }
                      </select>
                  </div>
                  <ReactQuill  className='text-sm font-semibold h-25' value={description} onChange={setDescription}/>
                  <div>
                      <label for="thumbnail" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Thumbnail Image</label>
                      <input type="file" name="thumbnail" accept='png,jpeg,jpg'  onChange={(e)=>setThumbnail(e.target.files[0])} id="thumbnail"  className='rounded-lg w-[90%] md:w-full'   required="" />
                  </div>
               
                  <button type="submit" class="w-full text-white bg-zinc-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Updatef</button>
                 
              </form>
   </div>
    </div>
      
    </div>
  )
}

export default EditPost

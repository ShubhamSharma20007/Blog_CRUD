import React from 'react'
import { useContext,useEffect } from 'react';
import {UserContext} from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
const DeletePost = () => {
  const navigate = useNavigate()
  const{ currentUser} = useContext(UserContext)
  const token =  currentUser?.token
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <div>
      
    </div>
  )
}

export default DeletePost

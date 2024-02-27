import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../assets/avatar1.jpg"
import axios from "axios"
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import { useContext } from 'react'
import {UserContext} from '../Context/userContext'
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({authorId,creator,createdAt}) => {
  const {user} = useContext(UserContext)
console.log(user)
  const[author,setAuthor]=React.useState([])
  const getAuthor = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/v1/api/posts/users/${creator}`)
      const data = await response.data
      setAuthor(data.userData)
    } catch (error) {
      console.error("Error fetching author:", error)
    }
  }
    useEffect(()=>{
      getAuthor()
    },[])
  
   

  return (
    <div className='holder'>
      <Link to={`/posts/users/${authorId}`}>
       <div className="wrapper w-full flex  gap-5">
       <div>
          <img src={`${process.env.REACT_APP_ASSET_URL}/${user.avatar}`} alt="" className='w-12 rounded-full' />
        </div>
        <div className="">
          <h5 className='font-bold text-sm'>By: Albert Eistin</h5>
          <small className='font-semibold'><ReactTimeAgo date={new Date(createdAt)} locale='en-IN' /></small>
        </div>
       </div>
      </Link>
    </div>
  )
}

export default PostAuthor

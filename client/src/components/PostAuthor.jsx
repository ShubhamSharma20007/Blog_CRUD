import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../assets/avatar1.jpg"
const PostAuthor = ({authorId,creator}) => {
  return (
    <div>
      <Link to={`/posts/users/${authorId}`}>
       <div className="wrapper w-full flex  gap-5">
       <div>
          <img src={Avatar} alt="" className='w-12 rounded-full' />
        </div>
        <div className="">
          <h5 className='font-bold text-sm'>By: Albert Eistin</h5>
          <small className='font-semibold'>Just now</small>
        </div>
       </div>
      </Link>
    </div>
  )
}

export default PostAuthor

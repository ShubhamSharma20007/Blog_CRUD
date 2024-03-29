import React from 'react'
import PostItem from "../components/PostItem";
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
const CategoryPost = () => {
  const params = useParams();
  const{ category} = params
  const[isLoading,setIsLoading]=React.useState(true)
  const [posts,setPosts] = useState([])
// fetch the api

const FetchData =async()=>{
  try {
    const res = await  axios.get(`http://localhost:4000/v1/api/posts/categories/${category}`)      
    const data = await res.data;
  
    setPosts(data.rawCategory)

  } catch (error) {
    console.log(error)
  }
  finally{
    setIsLoading(false)
  }
}
    React.useEffect(() => {
     FetchData()
    },[category])


  
  return (
    <div>
     {
      isLoading && <Loader></Loader>
     }
      <section className="posts flex gap-6 m-5 flex-wrap ">
        {
       posts.length > 0 ? 
          posts.map(({ _id, thumbnail,creator, updateAt, createdAt, title, description,category }) => {
            return (
              
              <PostItem
                key={_id}
                thumbnail={thumbnail}
                title={title}
                desc={description}
                authorId={_id}
                postId={_id}
                creator={creator}
                category={category}
                updateAt={updateAt}
                createdAt={createdAt}
              />
              
            );
          }) :
          <h1 className="text-3xl font-bold "> No Data found</h1>
        }
      </section>
    </div>
  );
}

export default CategoryPost

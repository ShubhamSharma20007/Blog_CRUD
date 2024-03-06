import React from "react";
import PostItem from "./PostItem";

import Loader from "./Loader";
import axios from "axios"

const Posts = () => {
  const [posts, setPosts] = React.useState([]);
  const[isLoading,setIsLoading]=React.useState(true)

// fetch the api
const fetchData =async()=>{
  try {
    const res = await  axios.get(`http://localhost:4000/v1/api/posts`)      
    const data = await res.data;

    setPosts(data)

  } catch (error) {
    console.log(error)
  }
  finally{
    setIsLoading(false)
  }
}
    React.useEffect(() => {
     fetchData()
    },[])


  
  return (
    <div>
     {
      isLoading && <Loader></Loader>
     }
      <section className="posts auto-rows-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-x-4 gap-y-6 m-5">
        {
       posts && posts.allposts && posts.allposts.length > 0 ? 
          posts.allposts.map(({ _id, thumbnail,creator, updateAt, createdAt, title, description,category }) => {
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
};

export default Posts;

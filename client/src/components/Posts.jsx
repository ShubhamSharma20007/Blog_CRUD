import React from "react";
import PostItem from "./PostItem";
import {Dummy_json} from "../data"
import Loader from "./Loader";
import axios from "axios"

const Posts = () => {
  const [posts, setPosts] = React.useState(Dummy_json);
  const[isLoading,setIsLoading]=React.useState(true)

// fetch the api
const fetchData =async()=>{
  try {
    const res = await  axios.get(`http://localhost:4000/v1/api/posts`)      
    const data = await res.data;
    console.log(data)
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
      <section className="posts flex gap-6 m-5 flex-wrap ">
        {
       posts && posts.allposts && posts.allposts.length > 0 ? 
          posts.allposts.map(({ _id, thumbnail,creator, updateAt, title, description,category }) => {
            return (
              <PostItem
                key={_id}
                thumbnail={thumbnail}
                title={title}
                desc={description}
                authorId={creator}
                category={category}
                updateAt={updateAt}
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

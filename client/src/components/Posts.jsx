import React from "react";
import PostItem from "./PostItem";
import {Dummy_json} from "../data"
const Posts = () => {
  const [posts, setPosts] = React.useState(Dummy_json);
  return (
    <div>
      <section className="posts flex gap-6 m-5 flex-wrap ">
        {
          posts.length > 0 ? 
          posts.map(({ id, postId, thumbnail, title, desc, authorId,category }) => {
            console.log(id);
            return (
              <PostItem
                key={id}
                postId={id}
                thumbnail={thumbnail}
                title={title}
                desc={desc}
                authorId={authorId}
                category={category}
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

import React from "react";
import Router from "next/router";

export type PostProps = {
  id: string;
  text: string;
  isDone: boolean;
};


const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <a>{post.text}</a>
      <button className="todo-done">Voir les details</button>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;

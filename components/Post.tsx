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
      <button className="todo-doneD">Voir les details</button>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        .todo-doneD {
          background: #7cd6d0;
          position: fixed;
          right: 50px;
          font-size: 1rem;
        }
        .todo-doneD:hover {
          height: 2rem;
          background: #7cd6df;
        }
      `}</style>
    </div>
  );
};

export default Post;

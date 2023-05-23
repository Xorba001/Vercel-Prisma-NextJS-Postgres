import React,{ useContext } from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { FeedContext } from '../../context/FeedContext';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.todoItem.findUnique({
    where: {
      id: String(params?.id),
    },
  });
  return {
    props: post,
  };
};

const Post: React.FC<PostProps> = (props) => {
  const context = useContext(FeedContext);
if (!context) {
  throw new Error('useContext must be used within a FeedContext.Provider');
}
  const { feed, setFeed } = context;
  let text = props.text

  async function deletePost(id) {
    const response = await fetch(`/api/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setTimeout(function(){
      window.location.reload();
   }, 500);
      setFeed(feed.filter((post) => post.id !== id));
      Router.push('/');
    } else {
      console.error('Error deleting post:', await response.text());
    }
    Router.push('/');
  }

  async function markDone(id) {
    const response = await fetch(`/api/done/${id}`, {
      method: 'PUT',
    });
    if (response.ok) {
      setTimeout(function(){
      window.location.reload();
   }, 500);
      setFeed(feed.map((post) => post.id === id ? { ...post, isDone: true } : post));
      Router.push('/');
    } else {
      console.error('Error marking post as done:', await response.text());
    }
    await Router.push('/');
  }

  return (
    <Layout>
      <div>
        <h2>{text}</h2>
        <button className="todo-done" onClick={() => markDone(props.id)}>🗸 Accompli</button>
        <button className="todo-delete" onClick={() => deletePost(props.id)}>X Effacer</button>
        <button onClick={() => Router.push('/')}>
          ⌂ Retour a la liste todo
        </button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #7cd6d0;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post

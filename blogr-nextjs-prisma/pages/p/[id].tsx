import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import prisma from '../../lib/prisma';
import Router from 'next/router';

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
  let text = props.text

  async function deletePost(id) {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });
    Router.push('/');
  }

  async function markDone(id) {
    await fetch(`/api/done/${id}`, {
      method: 'PUT',
    });
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

import React, { useState } from "react"
import { GetServerSideProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma';
import { FeedContext } from "../context/FeedContext";

export const getStaticProps: GetServerSideProps = async () => {
  const feed = await prisma.todoItem.findMany({
    where: { isDone: false },
  });
  return {
    props: { feed },
    revalidate: 1,
    
  };
};


type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  const [feed, setFeed] = useState<PostProps[]>(props.feed);

  return (
    <FeedContext.Provider value={{ feed, setFeed }}>
    <Layout>
      <div className="page">
        <h1>Bonjour</h1>
        <h2>Voici votre liste de todo</h2>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}          
        </main>
      </div>
      <style jsx>{`
        .post {
          background: #7cd6d0;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
    </FeedContext.Provider>
  )
}

export default Blog

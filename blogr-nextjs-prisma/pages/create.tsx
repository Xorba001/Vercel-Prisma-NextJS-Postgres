// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [text, setText] = useState('');

    // /pages/create.tsx

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { text };
            await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await Router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div>
                <form onSubmit={submitData}>
                    <h1>Nouveau todo</h1>
                    <input
                        autoFocus
                        onChange={(e) => setText(e.target.value)}
                        placeholder="ecrire votre todo ici"
                        type="text"
                        value={text}
                    />
                    <input disabled={!text} type="submit" value="Ajouter" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>
                        retour a la liste todo
                    </a>
                </form>
            </div>
            <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
        </Layout>
    );
};

export default Draft;
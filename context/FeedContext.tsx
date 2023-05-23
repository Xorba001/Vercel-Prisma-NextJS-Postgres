import React from 'react';

export type PostProps = {
  id: string;
  text: string;
  isDone: boolean;
};

type FeedContextProps = {
  feed: PostProps[];
  setFeed: React.Dispatch<React.SetStateAction<PostProps[]>>;
};

const defaultContext: FeedContextProps = {
  feed: [],
  setFeed: () => {},
};

export const FeedContext = React.createContext<FeedContextProps>(defaultContext);

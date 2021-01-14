import React from 'react';
import Article from '../../Components/Article';
import { ArticleData } from '../../Data';

const ArticleScreen = () => {
  return (
    <div>
      {ArticleData.map((art) => (
        <Article key={art._id} article={art} />
      ))}
    </div>
  );
};

export default ArticleScreen;

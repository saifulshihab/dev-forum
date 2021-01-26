import React from 'react';
import Article from '../Components/Article';
import { ArticleData } from '../Data';

const ArticleContainer = ({ topArticle }) => {
  return (
    <div>
      {topArticle === true
        ? ArticleData.sort((a, b) =>
            parseInt(a.upvote) < parseInt(b.upvote) ? 1 : -1
          ).map((art) => <Article key={art._id} article={art} />)
        : !topArticle &&
          ArticleData.map((art) => <Article key={art._id} article={art} />)}
    </div>
  );
};

export default ArticleContainer;

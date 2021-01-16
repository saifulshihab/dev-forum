import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleDetails from '../../Components/ArticleDetails';
import { ArticleData } from '../../Data';

const SingleArticleScreen = () => {
  const { articleId } = useParams();
  console.log('I am article ' + articleId);
  return (
    <>
      {ArticleData.map(
        (article) =>
          article._id.toString() === articleId.toString() && (
            <ArticleDetails key={articleId} article={article} />
          )
      )}
    </>
  );
};

export default SingleArticleScreen;

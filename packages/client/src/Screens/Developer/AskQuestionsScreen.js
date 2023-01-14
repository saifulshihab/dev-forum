import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import QuestionScreen from './QuestionScreen';
import ArticleScreen from './ArticleScreen';
import SingleArticleContainer from '../../Container/SingleArticleContainer';
import ArticleContainer from '../../Container/ArticleContainer';

const AskQuestionsScreen = ({ location }) => {
  const { path, url } = useRouteMatch();
  const currentPath = location.pathname.split('/')[3];

  return (
    <div className='grid grid-cols-4 h-full'>
      <div className='col-span-4 sm:col-span-4 md:col-span-3'>
        <div className='heading'>
          <nav className='bg-gray-100 dark:bg-gray-800'>
            <div className='max-w-7xl border-b-4 dark:border-gray-700 border-white mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between h-10'>
                <div className='flex items-center'>
                  <div className=''>
                    <div className='flex items-baseline space-x-4 text-gray-600 dark:text-gray-200'>
                      <Link to={`${url}/questions`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            (currentPath === 'questions' || undefined) &&
                            'bg-white dark:bg-gray-700'
                          } hover:bg-white dark:hover:bg-gray-700 px-3 py-2.5 text-sm font-medium`}
                        >
                          <span className='h-full text-red-600 w-4 mr-1'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                              />
                            </svg>
                          </span>
                          <span className='h-full'>Ask Question</span>
                        </div>
                      </Link>
                      <Link to={`${url}/articles`}>
                        <div
                          className={`flex items-center cursor-pointer ${
                            currentPath === 'articles' && 'bg-white dark:bg-gray-700'
                          } hover:bg-white dark:hover:bg-gray-700 px-3 py-2.5 text-sm font-medium`}
                        >
                          <span className='h-full text-blue-600 w-4 mr-1'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                              />
                            </svg>
                          </span>
                          <span className='h-full'>Article</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className='question_article_feed px-2'>
          <Switch>
            <Route path={`${path}/questions`} component={QuestionScreen} />
            <Route path={`${path}/articles`} component={ArticleScreen} />{' '}
            <Route
              path={`${path}/topArticles/:articleId`}
              component={SingleArticleContainer}
            />
            <Redirect to={`${path}/questions`} />
          </Switch>
        </div>
      </div>
      <div className='hidden md:block'>
        <p className='text-md text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 font-semibold border-b-4 dark:border-gray-700 border-white p-2 mb-1'>
          <i className='fas fa-newspaper mr-2'></i>Top Articles
        </p>
        <ArticleContainer topArticle />
      </div>
    </div>
  );
};

export default AskQuestionsScreen;

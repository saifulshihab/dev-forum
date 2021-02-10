import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import QuestionScreen from './QuestionScreen';
import ArticleScreen from './ArticleScreen';
import SingleArticleContainer from '../../Container/SingleArticleContainer';
import ArticleContainer from '../../Container/ArticleContainer';

const AskQuestionsScreen = () => {
  const [questionOn, setQuestionOn] = useState(true);
  const [articleOn, setArticleOn] = useState(false);
  const [topArticleOn, setTopArticleOn] = useState(false);

  const { path, url } = useRouteMatch();
  return (
    <div className='grid grid-cols-4 h-full'>
      <div className='col-span-3 border-r-2'>
        <div className='heading'>
          <nav className='bg-gray-100 text-dark'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between h-10'>
                <div className='flex items-center'>
                  <div className='hidden md:block'>
                    <div className='flex items-baseline space-x-4'>
                      <Link
                        onClick={() => {
                          setQuestionOn(true);
                          setArticleOn(false);
                          setTopArticleOn(false);
                        }}
                        to={`${url}/questions`}
                      >
                        <div
                          className={`flex items-center cursor-pointer ${
                            questionOn && 'bg-white'
                          } text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
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
                      <Link
                        onClick={() => {
                          setArticleOn(true);
                          setQuestionOn(false);
                          setTopArticleOn(false);
                        }}
                        to={`${url}/articles`}
                      >
                        <div
                          className={`flex items-center cursor-pointer ${
                            articleOn && 'bg-white'
                          }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
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
                      <Link
                        onClick={() => {
                          setTopArticleOn(true);
                          setArticleOn(false);
                          setQuestionOn(false);
                        }}
                        to={`${url}/topArticles`}
                      >
                        <div
                          className={`flex items-center cursor-pointer ${
                            topArticleOn && 'bg-white'
                          }  text-gray-600 hover:bg-white hover:text-gray-600 px-3 py-2.5 text-sm font-medium`}
                        >
                          <span className='h-full text-green-600 w-4 mr-1'>
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
                                d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                              />
                            </svg>
                          </span>
                          <span className='h-full'>Top Article</span>
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
            <Route exact path={path} component={QuestionScreen} />
            <Route path={`${path}/questions`} component={QuestionScreen} />
            <Route path={`${path}/articles`} component={ArticleScreen} />{' '}
            <Route
              path={`${path}/topArticles/:articleId`}
              component={SingleArticleContainer}
            />
            <Route
              path={`${path}/topArticles`}
              component={() => <ArticleContainer topArticle />}
            />
          </Switch>
        </div>
      </div>
      <div>Sidebar</div>
    </div>
  );
};

export default AskQuestionsScreen;

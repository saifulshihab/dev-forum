import React from 'react';
import RepoLangDot from './RepoLangDot';

const GithubRepo = ({ repo }) => {
  return (
    <div className='w-80 lg:w-96 h-32 border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 inline-block rounded p-3 shadow mr-2 mb-2 text-gray-600 overflow-ellipsis overflow-hidden'>
      <a href={repo.svn_url}>
        <p className='text-sm h-6 font-semibold mb-1'>
          <i className='fas fa-book mr-2'></i>
          {repo.name}
        </p>
      </a>
      <p className='h-14 text-xs'>{repo.description}</p>
      <div className='flex mt-2 h-6 items-center text-xs mt-auto'>
        <div className='mr-4'>
          <RepoLangDot lang={repo.language} />
          {repo.language}
        </div>
        <p className='mr-4'>
          <i className='far fa-star mr-1'></i>
          {repo.stargazers_count}
        </p>
        <p className='mr-4'>
          <i className='fas fa-code-branch mr-1'></i>
          {repo.forks_count}
        </p>
        <p className='mr-4'>{repo.size}KB</p>
      </div>
    </div>
  );
};

export default GithubRepo;

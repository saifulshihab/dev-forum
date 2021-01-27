import React from 'react';
import RepoLangDot from './RepoLangDot';

const GithubRepo = ({ repo }) => {
  return (
    <div className='w-80 lg:w-96 h-36 border border-indigo-500 inline-block rounded p-4 shadow mr-2 mb-2 text-gray-600 overflow-ellipsis overflow-hidden'>
      <a href={repo.svn_url} target='_blank'>
        <p className='text-md h-6 font-semibold mb-1'>
          <i class='fas fa-book mr-2'></i>
          {repo.name}
        </p>
      </a>
      <p className='h-14 text-sm'>{repo.description}</p>
      <div className='flex mt-2 h-6 items-center mt-auto'>
        <p className='mr-4'>
          <RepoLangDot lang={repo.language} />
          {repo.language}
        </p>
        <p className='mr-4'>
          <i class='far fa-star mr-1'></i>
          {repo.stargazers_count}
        </p>
        <p className='mr-4'>
          <i class='fas fa-code-branch mr-1'></i>
          {repo.forks_count}
        </p>
        <p className='mr-4'>{repo.size}KB</p>
      </div>
    </div>
  );
};

export default GithubRepo;

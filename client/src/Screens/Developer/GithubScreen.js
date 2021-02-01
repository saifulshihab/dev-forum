import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GithubRepo from '../../Components/GithubRepo';
import Loader from '../../Components/Loader';

const GithubScreen = ({ username }) => {
  const [gh, setGithubData] = useState({});
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    const fetchGhData = async () => {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      const repoData = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setGithubData(res.data);
      setRepo(repoData.data);
    };
    // if (username !== '') {
    //   fetchGhData();
    // }
    fetchGhData();
  }, [username]);
  return (
    <div>
      {Object.keys(gh).length === 0 ? (
        <Loader />
      ) : (
        <div>
          <div className='flex items-center'>
            <div className='w-48 h-48 '>
              <img
                className='rounded-full'
                alt={gh.login}
                src={gh.avatar_url}
              />
            </div>
            <div className='text-gray-600 ml-3'>
              <p className='text-xl font-semibold'>{gh.name}</p>
              <p className='text-sm'>@{gh.login}</p>
              <p className='italic'>{gh.bio}</p>
              <p className=''>
                <i className='fas fa-map-marker-alt mr-2'></i>
                {gh.location}
              </p>
              <p>
                <i className='fas fa-users mr-2'></i>
                {gh.followers} Followers, {gh.following} Following
              </p>
              <p>
                <i className='fas fa-code-branch mr-2'></i>
                {gh.public_repos} repos, {gh.public_gists} gists
              </p>
              {gh.company !== null && (
                <p>
                  <i className='far fa-building mr-2'></i>
                  {gh.company}
                </p>
              )}
              {gh.email !== '' && <p>{gh.email}</p>}
              {gh.blog !== '' && (
                <p>
                  <i className='fas fa-globe mr-2'></i>
                  {gh.blog}
                </p>
              )}
            </div>
          </div>
          <div className='w-full mt-2 pt-5 border-t'>
            {repo.map((data) => (
              <GithubRepo key={data.id} repo={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubScreen;

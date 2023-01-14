import React from 'react';

const RepoLangDot = ({ lang }) => {
  const color =
    lang === 'JavaScript'
      ? '#f1e05a'
      : lang === 'Python'
      ? '#3572A5'
      : lang === 'CSS'
      ? '#563d7c'
      : lang === 'HTML'
      ? '#e34c26'
      : lang === 'PHP'
      ? '#4F5D95'
      : lang === 'Ruby'
      ? '#701516'
      : lang === 'Swift'
      ? '#ffac45'
      : lang === 'ASP'
      ? '#6a40fd'
      : lang === 'Shell'
      ? '#89e051'
      : lang === 'Go'
      ? '#00ADD8'
      : lang === 'PowerShell'
      ? '#012456'
      : lang === 'C'
      ? '#555555'
      : lang === 'Java'
      ? '#b07219'
      : lang === 'C#'
      ? '#178600'
      : lang === 'Scala'
      ? '#c22d40'
      : lang === 'Lua'
      ? '#000080'
      : lang === 'TypeScript'
      ? '#2b7489'
      : lang === 'Vue'
      ? '#2c3e50'
      : lang === 'Perl'
      ? '#0298c3'
      : lang === 'Kotlin'
      ? '#F18E33'
      : lang === 'Elixir' && '#6e4a7e';
  return (
    <div
      style={{ backgroundColor: color }}
      className={`w-3 h-3 mr-1 inline-block rounded-full`}
    ></div>
  );
};

export default RepoLangDot;

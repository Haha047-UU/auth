'use client'

// app/components/GithubExplorer.tsx
import React, { useState, useEffect } from 'react';
import { getUserRepos, getRepoDefaultBranch, getRepoTree } from '../app/api/github';
import RepoTree from "./RepoTree"


interface Repo {
  name: string;
  owner: { login: string };
}

const GithubExplorer: React.FC = () => {
  const [username, setUsername] = useState('');//当前输入的GitHub用户名
  const [repos, setRepos] = useState<Repo[]>([]);//用户仓库的数组
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);//当前选中的仓库名称
  const [selectedFileContent, setSelectedFileContent] = useState<string | null>(null);//当前选中文件的内容
  const [defaultBranch, setDefaultBranch] = useState<string | null>(null);//当前选中仓库的默认分支名称
  const [treeData, setTreeData] = useState<any>(null);//当前选中仓库的树状数据结构
  const [isLoading, setIsLoading] = useState(false);//指示是否正在加载数据的布尔值
  const [error, setError] = useState<string | null>(null);//存储可能发生的错误信息

  const fetchRepos = async () => {
    if (username) {
      setIsLoading(true);
      setError(null);
      try {
        const repoData = await getUserRepos(username);
        setRepos(repoData);
        setSelectedRepo(null);
        setTreeData(null);
        setSelectedFileContent(null);
      } catch (err) {
        setError('Failed to fetch repositories');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchRepoTree = async (repo: string) => {
    if (username && repo) {
      setIsLoading(true);
      setError(null);
      try {
        const defaultBranch = await getRepoDefaultBranch(username, repo);
        setDefaultBranch(defaultBranch);

        const tree = await getRepoTree(username, repo, defaultBranch);
        setTreeData(tree);
      } catch (err) {
        setError('Failed to fetch repository tree');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchFileContent = async (path: string) => {
    if (username && selectedRepo) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://raw.githubusercontent.com/${username}/${selectedRepo}/${defaultBranch}/${path}`);
        const content = await response.text();
        console.log(content);

        setSelectedFileContent(content);
      } catch (err) {
        setError('Failed to fetch file content');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedRepo) {
      fetchRepoTree(selectedRepo);
    }
  }, [selectedRepo]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2 mr-2"
        />
        <button
          onClick={fetchRepos}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Fetch Repos'}
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex">
        <div className="w-2/3 pr-4">
          <h2 className="text-xl font-bold mb-2">Repositories</h2>
          {isLoading && <div>Loading tree...</div>}
          {!isLoading && treeData && (
            <RepoTree tree={treeData} onFileClick={fetchFileContent} />
          )}
          {
            selectedFileContent
          }
        </div>
        <div className="w-1/3">
          <h2 className="text-xl font-bold mb-2">Repository Tree</h2>
          <ul>
            {repos.map((repo) => (
              <li
                key={repo.name}
                onClick={() => setSelectedRepo(repo.name)}
                className={`cursor-pointer p-2 ${selectedRepo === repo.name ? 'bg-gray-200' : ''}`}
              >
                {repo.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GithubExplorer;
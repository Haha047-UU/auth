import { Octokit } from "@octokit/rest";
import { auth } from "@/auth"

const octokit = new Octokit({ auth: process.env.access_token });


export async function getUserRepos(username: string) {
  const response = await octokit.rest.repos.listForUser({
    username,
    type: 'all', // 获取用户拥有的仓库
    sort: 'updated',
    per_page: 100
  });

  return response.data;

} //根据提供的用户名获取用户的仓库列表。

export async function getUserPrivateRepos(username: string) {  //根据提供的用户名获取用户的私有仓库列表。
  console.log(`开始获取用户 ${username} 的私有仓库列表`);

  try {
    const response = await octokit.rest.repos.listForUser({
      username,
      type: 'all', // 获取用户所有类型的仓库
      sort: 'updated',
      per_page: 100
    });

    const privateRepos = response.data.filter(repo => repo.private);
    console.log(`成功获取到 ${privateRepos.length} 个私有仓库`);
    return privateRepos;
  } catch (error) {
    console.error(`获取用户 ${username} 的私有仓库列表时发生错误: ${error}`);

    throw error; // 重新抛出错误，以便调用者可以处理
  }
}


export async function getRepoDefaultBranch(owner: string, repo: string) {//获取某个仓库的默认分支名称。owner：仓库的所有者，repo：仓库的名称
  const response = await octokit.rest.repos.get({
    owner,
    repo
  });
  return response.data.default_branch;
}

export async function getRepoTree(owner: string, repo: string, sha: string) {//获取一个 Git 仓库的目录树结构并将其构建为一个树形结构。sha提交的哈希值

  const response = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha: sha,
    recursive: 'true' //表示应该递归地获取所有子目录和文件。
  });

  return buildTree(response.data.tree);
}

function buildTree(items: any[]) {
  const root: any = { path: '', type: 'tree', children: [] };
  const map = new Map();

  items.forEach(item => {
    const parts = item.path.split('/');
    let current = root;

    parts.forEach((index: number) => {
      const path = parts.slice(0, index + 1).join('/');//将 parts 数组中从开始到当前索引（包括当前索引）的子数组连接成一个字符串，用作路径。
      if (!map.has(path)) {
        const newNode = { path, type: item.type, children: [] };
        current.children.push(newNode);
        map.set(path, newNode);
      }
      current = map.get(path);
    });
  });

  return root;
}
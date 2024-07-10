import React from 'react';

interface TreeNode {
  sha: string;
  path: string;
  type: 'blog' | 'tree';
  content?: string; // 仅当 type 为 'blog' 时存在
  children?: TreeNode[];
}

interface RepoTreeProps {
  tree: TreeNode[];
  onFileClick: (path: string, content: string | undefined) => void;
}

const RepoTree: React.FC<RepoTreeProps> = ({ tree, onFileClick }) => {
  const renderTreeNode = (node: TreeNode, isRoot = false): React.ReactNode => {
    // 如果是根节点，不显示路径
    const displayPath = isRoot ? '' : node.path;

    return (
      <li key={node.sha}>
        <span
          onClick={() => {
            if (node.type === 'blog') {
              onFileClick(node.path, node.content);
            }
          }}
          style={{ cursor: node.type === 'blog' ? 'pointer' : 'default' }}
        >
          {displayPath}
        </span>
        {node.type === 'tree' && (
          <ul>
            {node.children &&
              node.children.map((child) => renderTreeNode(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul>{tree.map((node) => renderTreeNode(node, true))}</ul>
  );
};

export default RepoTree;
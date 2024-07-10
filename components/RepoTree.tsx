import React, { useState } from 'react';

interface TreeNode {
  path: string;
  type: string;
  children?: TreeNode[];
}
// 定义组件的属性接口
interface RepoTreeProps {
  tree: TreeNode;
  onFileClick: (path: string) => Promise<void>;
}

const RepoTree: React.FC<RepoTreeProps> = ({ tree, onFileClick }) => {
  // 用于跟踪哪些节点是展开的
  const [expandedPaths, setExpandedPaths] = useState<string[]>([]);

  const toggleNode = (path: string) => {
    setExpandedPaths(prevExpandedPaths => {
      if (prevExpandedPaths.includes(path)) {
        return prevExpandedPaths.filter(p => p !== path);
      } else {
        return [...prevExpandedPaths, path];
      }
    });
  };

  const renderNode = (node: TreeNode) => {
    return (
      <div key={node.path}>
        <div onClick={() => onFileClick(node.path)}>
          {node.path} ({node.type})
        </div>
        {node.children && expandedPaths.includes(node.path) && (
          <div>
            {node.children.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {renderNode(tree)}
    </div>
  );
};

export default RepoTree;
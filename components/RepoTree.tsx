'use client'

import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';

interface TreeNode {
  path: string;
  type: 'blob' | 'tree';
  children?: TreeNode[];
}

interface RepoTreeProps {
  tree: TreeNode;
  onFileClick: (path: string) => void;
}

const RepoTree: React.FC<RepoTreeProps> = ({ tree, onFileClick }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (path: string) => {
    setExpanded(prev => ({ ...prev, [path]: !prev[path] }));
  }

  const renderTree = (node: TreeNode, level: number = 0, isLast: boolean = true) => {
    const isExpanded = expanded[node.path];
    const hasChildren = node.type === 'tree';

    return (
      <div key={node.path} className="relative">
        <div className="flex items-center py-1">
          {level > 0 && (
            <>
              {[...Array(level - 1)].map((_, i) => (
                <div key={i} className="w-6 h-6 border-l border-gray-300"></div>
              ))}
              <div className={`w-6 h-6 border-l ${isLast ? 'border-b' : ''} border-gray-300`}></div>
            </>
          )}
          <div
            onClick={() => hasChildren ? toggleExpand(node.path) : onFileClick(node.path)}
            className={`flex items-center ${hasChildren ? 'cursor-pointer' : ''}`}
          >
            <span className="mr-2 text-blue-500">
              {hasChildren ? (isExpanded ? <FaFolderOpen /> : <FaFolder />) : <FaFile />}
            </span>
            <span className="text-gray-800 hover:text-blue-600 transition-colors">
              {node.path.split('/').pop()}
            </span>
          </div>
        </div>
        {hasChildren && isExpanded && node.children && (
          <div className="ml-6">
            {node.children.map((child, index) =>
              renderTree(child, level + 1, index === node.children!.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return <div className='font-mono text-sm'>{renderTree(tree)}</div>;
};

export default RepoTree;
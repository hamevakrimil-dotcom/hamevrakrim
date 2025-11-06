import React from 'react';
import { OliveBranchIcon } from './icons';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-red-700 p-2 rounded-full">
        <OliveBranchIcon className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold text-stone-900 tracking-tight">
        המבקרים!
      </span>
    </div>
  );
};

export default Logo;

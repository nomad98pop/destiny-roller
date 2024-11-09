import React from 'react';
import { Sparkles } from 'lucide-react';
import { Modifier } from '../types';

interface ModifierBadgeProps {
  modifier: Modifier;
}

const ModifierBadge: React.FC<ModifierBadgeProps> = ({ modifier }) => {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      <Sparkles className={`w-3 h-3 ${modifier.color}`} />
      <span className={`text-sm font-medium ${modifier.color}`}>
        {modifier.name}
      </span>
      <span className="text-xs text-gray-400">
        • {modifier.description}
      </span>
    </div>
  );
};

export default ModifierBadge;
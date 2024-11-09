import React from 'react';
import { Clock } from 'lucide-react';
import { Roll } from '../types';
import ModifierBadge from './ModifierBadge';

interface RollHistoryProps {
  rolls: Roll[];
}

const RollHistory: React.FC<RollHistoryProps> = ({ rolls }) => {
  const getRarityColor = (rarity: Roll['rarity']) => {
    const colors = {
      mythical: 'text-rose-400 border-rose-400 bg-rose-400/10',
      legendary: 'text-yellow-400 border-yellow-400 bg-yellow-400/10',
      ancient: 'text-amber-400 border-amber-400 bg-amber-400/10',
      epic: 'text-purple-400 border-purple-400 bg-purple-400/10',
      exotic: 'text-orange-400 border-orange-400 bg-orange-400/10',
      'ultra rare': 'text-pink-400 border-pink-400 bg-pink-400/10',
      rare: 'text-blue-400 border-blue-400 bg-blue-400/10',
      uncommon: 'text-green-400 border-green-400 bg-green-400/10',
      common: 'text-gray-400 border-gray-400 bg-gray-400/10'
    };
    return colors[rarity];
  };

  if (rolls.length === 0) return null;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Roll History
      </h2>
      <div className="space-y-3">
        {rolls.map((roll) => (
          <div
            key={roll.id}
            className={`border rounded-lg p-3 ${getRarityColor(roll.rarity)}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="capitalize font-medium">{roll.rarity}</span>
              <span className="text-sm opacity-75">
                {new Date(roll.timestamp).toLocaleTimeString()}
              </span>
            </div>
            {roll.modifier && (
              <ModifierBadge modifier={roll.modifier} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollHistory;
import React from 'react';
import { Package } from 'lucide-react';
import { Roll, InventoryStats } from '../types';
import ModifierBadge from './ModifierBadge';

interface InventoryProps {
  rolls: Roll[];
  discoveredRarities: Set<string>;
}

const Inventory: React.FC<InventoryProps> = ({ rolls, discoveredRarities }) => {
  const stats: InventoryStats = rolls.reduce(
    (acc, roll) => ({
      ...acc,
      [roll.rarity]: acc[roll.rarity] + 1,
      total: acc.total + 1,
    }),
    { mythical: 0, legendary: 0, ancient: 0, epic: 0, exotic: 0, 'ultra rare': 0, rare: 0, uncommon: 0, common: 0, total: 0 }
  );

  const getRarityStyle = (rarity: keyof Omit<InventoryStats, 'total'>) => {
    const styles = {
      mythical: 'bg-rose-400/20 border-rose-400',
      legendary: 'bg-yellow-400/20 border-yellow-400',
      ancient: 'bg-amber-400/20 border-amber-400',
      epic: 'bg-purple-400/20 border-purple-400',
      exotic: 'bg-orange-400/20 border-orange-400',
      'ultra rare': 'bg-pink-400/20 border-pink-400',
      rare: 'bg-blue-400/20 border-blue-400',
      uncommon: 'bg-green-400/20 border-green-400',
      common: 'bg-gray-400/20 border-gray-400',
    };
    return styles[rarity];
  };

  // Get the rarest modifier for each discovered rarity
  const bestModifiers = Object.keys(stats)
    .filter(key => key !== 'total' && discoveredRarities.has(key))
    .reduce((acc, rarity) => {
      const rarityRolls = rolls.filter(r => r.rarity === rarity && r.modifier);
      if (rarityRolls.length === 0) return acc;
      
      // Sort by modifier probability (ascending) to get the rarest
      const rollWithRarestModifier = rarityRolls.sort(
        (a, b) => (a.modifier?.probability || 0) - (b.modifier?.probability || 0)
      )[0];
      
      return { ...acc, [rarity]: rollWithRarestModifier };
    }, {} as Record<string, Roll | undefined>);

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Package className="w-5 h-5" />
        Inventory
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {(Object.keys(stats) as Array<keyof InventoryStats>)
          .filter(key => key !== 'total')
          .map(rarity => (
            discoveredRarities.has(rarity) ? (
              <div
                key={rarity}
                className={`border rounded-lg p-4 ${getRarityStyle(rarity)}`}
              >
                <div className="text-sm capitalize mb-1">{rarity}</div>
                <div className="text-2xl font-bold mb-2">{stats[rarity]}</div>
                {bestModifiers[rarity]?.modifier && (
                  <ModifierBadge modifier={bestModifiers[rarity]!.modifier!} />
                )}
              </div>
            ) : (
              <div
                key={rarity}
                className="border rounded-lg p-4 bg-gray-700/20 border-gray-700"
              >
                <div className="text-sm mb-1">???</div>
                <div className="text-2xl font-bold mb-2">0</div>
              </div>
            )
          ))}
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Rolls</span>
          <span className="text-xl font-bold">{stats.total}</span>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
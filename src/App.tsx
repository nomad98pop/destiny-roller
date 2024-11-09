import React, { useState, useCallback } from 'react';
import { Sparkles, Star } from 'lucide-react';
import RarityRoll from './components/RarityRoll';
import RollHistory from './components/RollHistory';
import Inventory from './components/Inventory';
import { Roll, Rarity } from './types';
import { modifiers } from './utils/modifiers';

function App() {
  const [rolls, setRolls] = useState<Roll[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [isAutoRolling, setIsAutoRolling] = useState(false);

  const rarityChances: [Rarity, number][] = [
    ['mythical', 0.1],
    ['legendary', 0.5],
    ['ancient', 1],
    ['epic', 2],
    ['exotic', 3],
    ['ultra rare', 5],
    ['rare', 8],
    ['uncommon', 20],
    ['common', 60.4],
  ];

  const performRoll = useCallback(() => {
    const random = Math.random() * 100;
    let rarity: Rarity = 'common';
    let sum = 0;
    
    for (const [r, chance] of rarityChances) {
      sum += chance;
      if (random <= sum) {
        rarity = r;
        break;
      }
    }

    // Get rarest modifier for this rarity
    const rarityIndex = rarityChances.findIndex(([r]) => r === rarity);
    const modifierRoll = Math.random() * 100;
    let modifier = null;
    let probabilitySum = 0;
    
    // Sort modifiers by probability (rarer first)
    const sortedModifiers = [...modifiers].sort((a, b) => a.probability - b.probability);
    // Only use modifiers that match the rarity tier
    const availableModifiers = sortedModifiers.slice(0, Math.max(1, Math.floor((rarityIndex + 1) * 2)));

    for (const mod of availableModifiers) {
      probabilitySum += mod.probability;
      if (modifierRoll < probabilitySum) {
        modifier = mod;
        break;
      }
    }

    const newRoll: Roll = {
      id: Date.now(),
      rarity,
      modifier,
      timestamp: new Date(),
    };

    setRolls(prev => [newRoll, ...prev]);
  }, []);

  const handleRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setTimeout(() => {
      performRoll();
      setIsRolling(false);
    }, 1500);
  };

  const handleAutoRoll = () => {
    if (isAutoRolling) {
      setIsAutoRolling(false);
      return;
    }

    setIsAutoRolling(true);
    const interval = setInterval(() => {
      if (!isRolling) {
        handleRoll();
      }
    }, 2000);

    return () => clearInterval(interval);
  };

  const discoveredRarities = new Set(rolls.map(roll => roll.rarity));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-400" />
            Destiny Roller
            <Star className="text-yellow-400" />
          </h1>
          <p className="text-gray-400">Test your luck with the mystical forces</p>
        </div>

        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <div className="text-center mb-4">
            <div className="text-sm space-y-2">
              {rarityChances.map(([rarity, chance]) => (
                discoveredRarities.has(rarity) ? (
                  <div key={rarity} className="flex justify-between items-center">
                    <span className="text-gray-400 capitalize">{rarity}</span>
                    <span className={getRarityColor(rarity)}>{chance}%</span>
                  </div>
                ) : (
                  <div key={rarity} className="flex justify-between items-center">
                    <span className="text-gray-400">???</span>
                    <span className="text-gray-400">???</span>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRoll}
              disabled={isRolling}
              className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ${
                isRolling
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
              }`}
            >
              {isRolling ? 'Rolling...' : 'Roll!'}
            </button>

            {rolls.length >= 100 && (
              <button
                onClick={handleAutoRoll}
                className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ${
                  isAutoRolling
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'
                } transform hover:scale-105`}
              >
                {isAutoRolling ? 'Stop Auto Roll' : 'Start Auto Roll'}
              </button>
            )}
          </div>
        </div>

        {isRolling && <RarityRoll />}

        <Inventory rolls={rolls} discoveredRarities={discoveredRarities} />
        <RollHistory rolls={rolls} />
      </div>
    </div>
  );
}

function getRarityColor(rarity: Rarity): string {
  const colors = {
    mythical: 'text-rose-400',
    legendary: 'text-yellow-400',
    ancient: 'text-amber-400',
    epic: 'text-purple-400',
    exotic: 'text-orange-400',
    'ultra rare': 'text-pink-400',
    rare: 'text-blue-400',
    uncommon: 'text-green-400',
    common: 'text-gray-400'
  };
  return colors[rarity];
}

export default App;
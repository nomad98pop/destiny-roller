export type Modifier = {
  name: string;
  description: string;
  color: string;
  probability: number;
};

export type Rarity = 
  | 'mythical'
  | 'legendary'
  | 'ancient'
  | 'epic'
  | 'exotic'
  | 'ultra rare'
  | 'rare'
  | 'uncommon'
  | 'common';

export interface Roll {
  id: number;
  rarity: Rarity;
  modifier: Modifier | null;
  timestamp: Date;
}

export interface InventoryStats {
  mythical: number;
  legendary: number;
  ancient: number;
  epic: number;
  exotic: number;
  'ultra rare': number;
  rare: number;
  uncommon: number;
  common: number;
  total: number;
}
export interface SubTab {
  id: number;
  name: string;
}
interface Tab {
  id: number;
  name: string;
  subcategories: SubTab[] | null;
}

export const mock_tab_data: Tab[] = [
  {
    id: 1,
    name: 'LOOKS',
    subcategories: null,
  },
  {
    id: 2,
    name: 'WALLS',
    subcategories: null,
  },
  {
    id: 3,
    name: 'FLOORS',
    subcategories: [
      {
        id: 1,
        name: 'WOOD',
      },
      { id: 2, name: 'CARPET' },
      {
        id: 3,
        name: 'TILE',
      },
      {
        id: 4,
        name: 'LAMINATE',
      },
      {
        id: 5,
        name: 'VINYL',
      },
    ],
  },
  {
    id: 4,
    name: 'RUGS',
    subcategories: null,
  },
  {
    id: 5,
    name: 'ROOM_DECOR',
    subcategories: null,
  },
  {
    id: 6,
    name: 'LIGHTING',
    subcategories: null,
  },
  {
    id: 7,
    name: 'PLANTS',
    subcategories: null,
  },
  {
    id: 8,
    name: 'WALL_DECOR',
    subcategories: null,
  },
];

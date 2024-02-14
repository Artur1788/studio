import {
  Floor,
  Lighting,
  Plant,
  RoomDecor,
  Rug,
  Wall,
  WallDecor,
} from '../../features/general/general.types';
import { ActionBarFloor } from './components/ActionBarFloor';
import { ActionBarLighting } from './components/ActionBarLighting';
import { ActionBarPlant } from './components/ActionBarPlant';
import { ActionBarRoomDecor } from './components/ActionBarRoomDecor';
import { ActionBarRug } from './components/ActionBarRug';
import { ActionBarWallDecor } from './components/ActionBarWallDecor';
import { ActionBarWall } from './components/ActionBarWalls';

export interface ListType {
  listAction: List[];
  setListAction: React.Dispatch<React.SetStateAction<List[]>>;
}

export interface ActionBarProps {
  setActiveData: React.Dispatch<React.SetStateAction<string>>;
}

export type List =
  | Wall
  | Floor
  | Rug
  | Plant
  | WallDecor
  | Lighting
  | RoomDecor;

export const ActionType = {
  LOOKS: ActionBarWall,
  WALLS: ActionBarWall,
  FLOOR: ActionBarFloor,
  RUGS: ActionBarRug,
  PLANTS: ActionBarPlant,
  LIGHTING: ActionBarLighting,
  'WALL DECOR': ActionBarWallDecor,
  'ROOM DECOR': ActionBarRoomDecor,
};

import { AppDispatch } from '../../app/store';

export interface ApplicableResponse {
  [key: string]: boolean;
}
export interface SubTab {
  id: number;
  name: string;
}

export interface Tab {
  id: number;
  name: string;
  subcategories: SubTab[] | [];
}

export interface DetailsInfo {
  vendorName: string;
  name: string;
  skuNumber: string | null;
  productImageURL?: string;
  logo: string;
  urlOnVendorPage: string;
  thumbnailURL?: string;
}

export type TabData =
  | 'LOOKS'
  | 'WALLS'
  | 'FLOOR'
  | 'RUGS'
  | 'ROOM DECOR'
  | 'WALL DECOR'
  | 'LIGHTING'
  | 'PLANTS';

export interface Wall {
  hexCode: string;
  id: number | string;
  logo: string;
  name: string;
  rgbCode: number[];
  skuNumber: string;
  urlOnVendorPage: string;
  vendorID: number;
  vendorName: string;
}

export interface Floor {
  code: string;
  floorIcon: string;
  id: number | string;
  logo: string;
  name: string;
  type: string;
  urlOnVendorPage: string;
  vendorID: number;
  vendorName: string;
}

export interface Data {
  data: Floor[];
  next_page: string;
  typeSubTypeFilter?: string;
}

export interface WallData {
  data: Wall[];
  next_page: string;
}

export interface Rug {
  id: number | string;
  name?: string;
  logo?: string;
  urlOnVendorPage?: string;
  vendorID?: number;
  vendorName?: string;
  paused?: boolean;
  cost?: number;
  preprocessed?: boolean;
  editable?: boolean;
  productImageURL?: string;
  thumbnailURL?: string;
  skuNumber?: string;
  width?: number;
  height?: number;
  price?: number;
  sphereUrl?: null;
}

export interface Plant {
  id?: number | string;
  name?: string;
  logo?: string;
  urlOnVendorPage?: string;
  vendorID?: number;
  vendorName?: string;
  paused?: boolean;
  cost?: number;
  preprocessed?: boolean;
  editable?: boolean;
  productImageURL?: string;
  thumbnailURL?: string;
  skuNumber?: string;
  width?: number;
  height?: number;
  price?: number;
  sphereUrl?: null;
}

export interface Lighting {
  id?: number | string;
  name?: string;
  logo?: string;
  urlOnVendorPage?: string;
  vendorID?: number;
  vendorName?: string;
  paused?: boolean;
  cost?: number;
  preprocessed?: boolean;
  editable?: boolean;
  productImageURL?: string;
  thumbnailURL?: string;
  skuNumber?: string;
  width?: number;
  height?: number;
  price?: number;
  sphereUrl?: null;
}

export interface RoomDecor {
  id?: number | string;
  name?: string;
  logo?: string;
  urlOnVendorPage?: string;
  vendorID?: number;
  vendorName?: string;
  paused?: boolean;
  cost?: number;
  preprocessed?: boolean;
  editable?: boolean;
  productImageURL?: string;
  thumbnailURL?: string;
  skuNumber?: string;
  width?: number;
  height?: number;
  price?: number;
  sphereUrl?: null;
}

export interface WallDecor {
  id?: number | string;
  name?: string;
  logo?: string;
  urlOnVendorPage?: string;
  vendorID?: number;
  vendorName?: string;
  paused?: boolean;
  cost?: number;
  preprocessed?: boolean;
  editable?: boolean;
  productImageURL?: string;
  thumbnailURL?: string;
  skuNumber?: string;
  width?: number;
  height?: number;
  price?: number;
  sphereUrl?: null;
}

export interface GetInspirationStyleI {
  dispatch: AppDispatch;
  signal: AbortSignal;
  id: number;
}

export interface HardcodedLook {
  id: number;
  url: string;
  urlWithLogos?: string | null;
  wallPallet: Wall[];
  wallColor: Wall;
  floorTile: Floor;
}

export interface Selected {
  selectedTab?: string;
  selectedSubTab?: string;
  selectedLook: HardcodedLook;
  selectedName?: string;
  selectedFloor: Floor;
  selectedWall: Wall;
  selectedRug: Rug;
  selectedPlant: Plant;
  selectedWallDecor: WallDecor;
  selectedRoomDecor: RoomDecor;
  selectedLighting: Lighting;
}

export interface ActionBar {
  selectedFloor: Floor;
  selectedWall: Wall;
  selectedRug?: Rug;
  selectedLighting?: Lighting;
}

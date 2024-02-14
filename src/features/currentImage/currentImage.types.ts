import { AppDispatch } from '../../app/store';
import { TabData } from '../general/general.types';

export type Loading =
  | null
  | 'connecting'
  | 'shortTime'
  | 'longTime'
  | 'finishing';
export interface NewLookResponse {
  ID: number;
  minutesRemaining: number;
  secondsRemaining: number;
}

export interface ApplyLookReq {
  id: number;
  signal: AbortSignal;
  dispatch: AppDispatch;
}

export interface CurrentImage {
  isSphere: boolean;
  originalPhotoName: string;
  timeRemaining: number;
  before: string;
  after: string;
  lookResult: LookResult;
  processId: number | null;
}

export interface PlacementItem {
  available: boolean;
  error: boolean | string;
  hexCode: string | null;
  id: number;
  logo: string;
  marker: {
    coordinates: [number, number, number];
  };
  skuNumber: string | null;
  name: string;
  placementStatus: 'PLACED' | 'FAILED';
  productType: TabData;
  thumbnailURL: string | null;
  title: string;
  vendorName: string;
  vendorURL: string;
}

export interface LookResult {
  id: number;
  lookId: number;
  lookUrl: string;
  photo_name: string;
  originalPhotoName: string;
  originalPhotoURL: string;
  rotateSphere?: number[];
  placements: PlacementItem[];
  status: string;
  type: string;
}

export interface DataFromUrl {
  isSphere: string;
  originalPhotoName: string;
  before: string;
}

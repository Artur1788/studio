import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getName } from '../../utils/getNameFromUrl';
import { PlacementItem } from '../currentImage/currentImage.types.ts';
import { fetchApplicableTab } from './asyncThunks/applicableTabThunk';
import { fetchTab } from './asyncThunks/categoryAsyncThunk';
import { fetchDecor } from './asyncThunks/decorAsyncThunk';
import { fetchFloor } from './asyncThunks/floorAsyncThunk';
import { fetchHardcodedLook } from './asyncThunks/hardcodedLookAsyncThunks';
import { uploadInspirationStyle } from './asyncThunks/inspirationStyleAsyncThunk.ts';
import { fetchRug } from './asyncThunks/rugAsyncThunk';
import { fetchWall } from './asyncThunks/wallAsyncThunk';
import {
  ApplicableResponse,
  Data,
  Floor,
  HardcodedLook,
  Lighting,
  Plant,
  RoomDecor,
  Rug,
  Selected,
  SubTab,
  Tab,
  TabData,
  Wall,
  WallData,
  WallDecor,
} from './general.types';
import { Storage } from './services/storage.service.ts';

export interface GeneralState {
  tab: Tab[];
  subTab: SubTab[];
  disableTab: ApplicableResponse;
  look: HardcodedLook[];
  wall: WallData;
  floor: Data;
  rug: Data;
  actionBar: string[];
  plant: Data;
  lighting: Data;
  roomDecor: Data;
  wallDecor: Data;
  selected: Selected;
  isLoading: boolean;
  error: string;
}

const initialState: GeneralState = {
  tab: Storage.get_saved_data()?.tab || [],
  subTab: Storage.get_saved_data()?.subTab || [],
  disableTab:
    Storage.get_saved_data()?.disableTab || ({} as ApplicableResponse),
  look: Storage.get_saved_data()?.look || [],
  wall: Storage.get_saved_data()?.wall || ({} as WallData),
  floor: Storage.get_saved_data()?.floor || ({} as Data),
  rug: Storage.get_saved_data()?.rug || ({} as Data),
  actionBar: Storage.get_saved_data()?.actionBar || [],
  plant: Storage.get_saved_data()?.plant || ({} as Data),
  lighting: Storage.get_saved_data()?.lighting || ({} as Data),
  roomDecor: Storage.get_saved_data()?.roomDecor || ({} as Data),
  wallDecor: Storage.get_saved_data()?.wallDecor || ({} as Data),
  selected: {
    selectedTab: '',
    selectedSubTab: '',
    selectedLook: {} as HardcodedLook,
    selectedName: '',
    selectedFloor: {} as Floor,
    selectedWall: {} as Wall,
    selectedRug:
      Storage.get_saved_data()?.selected.selectedRug || ({ id: 0 } as Rug),
    selectedPlant:
      Storage.get_saved_data()?.selected.selectedPlant || ({ id: 0 } as Plant),
    selectedWallDecor:
      Storage.get_saved_data()?.selected.selectedWallDecor ||
      ({ id: 0 } as WallDecor),
    selectedRoomDecor:
      Storage.get_saved_data()?.selected.selectedRoomDecor ||
      ({ id: 0 } as RoomDecor),
    selectedLighting:
      Storage.get_saved_data()?.selected.selectedLighting ||
      ({ id: 0 } as Lighting),
  },
  isLoading: Storage.get_saved_data()?.isLoading || false,
  error: Storage.get_saved_data()?.error || '',
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    updateSelectedTab: (state, action: PayloadAction<TabData>) => {
      state.selected.selectedTab = action.payload;
      Storage.save_data(state);
    },
    addActionBar: (state, action: PayloadAction<string>) => {
      if (!state.actionBar.includes(action.payload)) {
        state.actionBar.unshift(action.payload);
      }
      Storage.save_data(state);
    },
    changeActionBarIndex: (state, action: PayloadAction<string>) => {
      const index = state.actionBar.indexOf(action.payload);
      if (index !== -1) {
        state.actionBar.splice(index, 1);
        state.actionBar.unshift(action.payload);
      }
      Storage.save_data(state);
    },
    removeActionBar: (state, action: PayloadAction<string>) => {
      state.actionBar = state.actionBar.filter(function (item) {
        return item !== action.payload;
      });
      Storage.save_data(state);
    },
    addSubTab: (state, action: PayloadAction<SubTab[]>) => {
      state.subTab = action.payload;
      Storage.save_data(state);
    },
    updateSelectedLook: (state, action: PayloadAction<HardcodedLook>) => {
      state.selected.selectedLook = action.payload;
      state.selected.selectedWall = action.payload.wallColor;
      state.selected.selectedFloor = action.payload.floorTile;
      if (!state.actionBar.includes(state.tab[1].name)) {
        state.actionBar.push(state.tab[1].name, state.tab[2].name);
      }
    },
    updateSelectedName: (state, action: PayloadAction<string>) => {
      state.selected.selectedName = action.payload;
    },
    updateSelectedFloor: (state, action: PayloadAction<Floor>) => {
      state.selected.selectedFloor = action.payload;
    },
    updateSelectedWall: (state, action: PayloadAction<Wall>) => {
      state.selected.selectedWall = action.payload;
    },
    updateSelectedRug: (state, action: PayloadAction<Rug>) => {
      state.selected.selectedRug = action.payload;
    },
    updateSelectedLighting: (state, action: PayloadAction<Lighting>) => {
      state.selected.selectedLighting = action.payload;
    },
    updateSelectedRoomDecor: (state, action: PayloadAction<RoomDecor>) => {
      state.selected.selectedRoomDecor = action.payload;
    },
    updateSelectedWallDecor: (state, action: PayloadAction<WallDecor>) => {
      state.selected.selectedWallDecor = action.payload;
    },
    updateSelectedPlant: (state, action: PayloadAction<Plant>) => {
      state.selected.selectedPlant = action.payload;
    },
    updateHardcodedLooks: (state, action: PayloadAction<HardcodedLook[]>) => {
      state.look = action.payload;
    },
    updateGeneralData: (
      state,
      action: PayloadAction<Record<TabData, PlacementItem>>,
    ) => {
      state.selected.selectedFloor.id = action.payload.FLOOR?.id || '';
      state.selected.selectedWall.id = action.payload.WALLS?.id || '';
      state.selected.selectedRug.id = action.payload.RUGS?.id || '';
      state.selected.selectedLighting.id = action.payload.LIGHTING?.id || '';
      state.selected.selectedRoomDecor.id =
        action.payload['ROOM DECOR']?.id || '';
      state.selected.selectedWallDecor.id =
        action.payload['WALL DECOR']?.id || '';
      state.selected.selectedPlant.id = action.payload.PLANTS?.id || '';
    },
    setSelectedLookUrl(state, action: PayloadAction<string>) {
      state.selected.selectedLook.url = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTab.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTab.fulfilled, (state, action) => {
        state.isLoading = false;

        const wallTab = action.payload.find(
          tabItem => tabItem.name === 'WALLS',
        );

        state.selected.selectedTab = wallTab?.name;

        if (!state.actionBar.includes(action.payload[1].name)) {
          state.actionBar.push(action.payload[1].name, action.payload[2].name);
        }
        state.tab = action.payload;
        state.error = '';
        Storage.save_data(state);
      })
      .addCase(fetchTab.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchHardcodedLook.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchHardcodedLook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected.selectedLook = action.payload[0];
        if (
          !state.selected.selectedFloor.id &&
          !state.selected.selectedWall.id
        ) {
          state.selected.selectedName = getName(action.payload[0].url);
          state.selected.selectedFloor = action.payload[0].floorTile;
          state.selected.selectedWall = action.payload[0].wallColor;
        }
        state.look = action.payload;
        state.error = '';
        Storage.save_data(state);
      })
      .addCase(fetchHardcodedLook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchWall.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchWall.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.wall.next_page) {
          state.wall.data = [...state.wall.data, ...action.payload.data];
        } else {
          state.wall = action.payload;
        }
        state.wall.next_page = action.payload.next_page;

        state.error = '';
        Storage.save_data(state);
      })
      .addCase(fetchWall.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchFloor.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchFloor.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.floor.next_page) {
          state.floor.data = [...state.floor.data, ...action.payload.data];
        } else {
          state.floor = action.payload;
        }
        state.floor.next_page = action.payload.next_page;
        state.error = '';
        Storage.save_data(state);
      })
      .addCase(fetchFloor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchRug.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchRug.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.rug.next_page) {
          state.rug.data = [...state.rug.data, ...action.payload.data];
        } else {
          state.rug = action.payload;
        }
        state.rug.next_page = action.payload.next_page;
        state.error = '';
        Storage.save_data(state);
      })
      .addCase(fetchRug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchDecor.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchDecor.fulfilled, (state, action) => {
        const { typeSubTypeFilter } = action.payload;
        state.isLoading = false;

        const typeToStateProperty = {
          plant: 'plant',
          lighting: 'lighting',
          roomDecor: 'roomDecor',
          wallDecor: 'wallDecor',
        } as const;

        const stateProperty =
          typeToStateProperty[
            typeSubTypeFilter as keyof typeof typeToStateProperty
          ];
        // state[stateProperty] = action.payload;
        if (state[stateProperty].next_page) {
          state[stateProperty].data = [
            ...state[stateProperty].data,
            ...action.payload.data,
          ];
        } else {
          state[stateProperty] = action.payload;
        }
        state[stateProperty].next_page = action.payload.next_page;

        state.error = '';
        Storage.save_data(state);
      })
      .addCase(fetchDecor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchApplicableTab.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchApplicableTab.fulfilled, (state, action) => {
        state.isLoading = false;
        state.disableTab = action.payload;
        Storage.save_data(state);
      })
      .addCase(fetchApplicableTab.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(uploadInspirationStyle.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadInspirationStyle.fulfilled, (state, action) => {
        if (action.payload) {
          state.look.unshift(action.payload);
        }
        state.isLoading = false;
        Storage.save_data(state);
      })
      .addCase(uploadInspirationStyle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});

export const {
  updateHardcodedLooks,
  updateSelectedTab,
  addSubTab,
  updateSelectedLook,
  updateSelectedName,
  updateSelectedFloor,
  updateSelectedWall,
  updateSelectedRug,
  addActionBar,
  removeActionBar,
  changeActionBarIndex,
  updateSelectedLighting,
  updateSelectedWallDecor,
  updateSelectedPlant,
  updateSelectedRoomDecor,
  setSelectedLookUrl,
  updateGeneralData,
} = generalSlice.actions;

export default generalSlice.reducer;

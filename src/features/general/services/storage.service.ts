import { GeneralState as GeneralStateI } from '../generalSlice.ts';

interface StorageI {
  save_data: (state: GeneralStateI) => void;
  get_saved_data: () => GeneralStateI | null;
}

export const Storage: StorageI = {
  save_data: state => {
    sessionStorage.setItem('general', JSON.stringify(state));
  },
  get_saved_data: () =>
    JSON.parse(
      String(sessionStorage.getItem('general')),
    ) as GeneralStateI | null,
};

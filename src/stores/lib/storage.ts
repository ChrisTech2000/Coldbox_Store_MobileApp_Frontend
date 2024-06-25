import { createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV();

// eslint-disable-next-line
export default createJSONStorage<any>(() => ({
  setItem: (name, value) => {
    return mmkv.set(name, value);
  },
  getItem: (name) => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return mmkv.delete(name);
  },
}));

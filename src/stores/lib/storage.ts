import { createJSONStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

export const mmkv = createMMKV();

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
    return mmkv.remove(name);
  },
}));

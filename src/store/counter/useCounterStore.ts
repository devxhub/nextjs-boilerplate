import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { State, Store } from "./type";

const initialState: State = {
  count: 1,
};

const useCounterStore = create<Store>()(
  immer((set) => ({
    ...initialState,
    increment: (count: number) =>
      set((state) => {
        state.count += count;
      }),
    decrement: (count: number) =>
      set((state) => {
        state.count -= count;
      }),
  }))
);

export { useCounterStore };

type State = {
  count: number;
};

type Actions = {
  increment: (count: number) => void;
  decrement: (count: number) => void;
};

type Store = State & Actions;

export type { Actions, State, Store };

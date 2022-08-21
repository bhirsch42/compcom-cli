import React, { PropsWithChildren, useEffect } from "react";
import { createStore } from "../store";
import { loadedPilots } from "../store/slices/pilots";
import { useCompconData } from "./useCompconData";

type Store = ReturnType<typeof createStore>;
export type StoreState = ReturnType<Store["getState"]>;

const store = createStore();

const StoreContext = React.createContext<{ store: Store; state: StoreState }>({
  store,
  state: store.getState(),
});

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState<StoreState>(store.getState());
  const compconData = useCompconData();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    store.dispatch(loadedPilots(compconData));
    return unsubscribe;
  }, []);

  return (
    <StoreContext.Provider value={{ store, state }}>
      {children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  return React.useContext(StoreContext);
}

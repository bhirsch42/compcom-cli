import React, { PropsWithChildren, useEffect } from "react";
import { createStore } from "../store";
import { decremented, incremented } from "../store/counter";

type Store = ReturnType<typeof createStore>;
type StoreState = ReturnType<Store["getState"]>;

const store = createStore();

const StoreContext = React.createContext<{ store: Store; state: StoreState }>({
  store,
  state: store.getState(),
});

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState<StoreState>(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
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

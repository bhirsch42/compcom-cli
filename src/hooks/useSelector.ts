import { StoreState, useStore } from "./useStore";

type Selector<T> = (state: StoreState) => T;

export default function useSelector<T>(selector: Selector<T>) {
  const { state } = useStore();
  return selector(state);
}

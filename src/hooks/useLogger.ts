import { logged, LogType, ranCommand } from "../store/console";
import { useStore } from "./useStore";

export function useLogger() {
  const { store } = useStore();

  return {
    command(message: string) {
      store.dispatch(
        logged({
          type: LogType.COMMAND,
          message,
        })
      );
    },

    info(message: string) {
      store.dispatch(
        logged({
          type: LogType.INFO,
          message,
        })
      );
    },

    error(message: string) {
      store.dispatch(
        logged({
          type: LogType.ERROR,
          message,
        })
      );
    },
  };
}

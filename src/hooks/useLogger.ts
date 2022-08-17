import { logged, LogType, ranCommand } from "../store/slices/console";
import { useStore } from "./useStore";

export type UseLoggerReturns = {
  command(message: string): void;
  info(message: string): void;
  error(message: string): void;
};

export function useLogger(): UseLoggerReturns {
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

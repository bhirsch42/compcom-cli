import { map } from "ramda";
import { useLogger, UseLoggerReturns } from "./useLogger";

export function useDelayedLogger(delay = 0): UseLoggerReturns {
  return map<UseLoggerReturns, UseLoggerReturns>(
    (fn) => (message: string) => {
      setTimeout(() => {
        fn(message);
      }, delay);
    },
    useLogger()
  );
}

import yargs, { Argv } from "yargs";
import { useGoTo } from "../Router";
import { logged, LogType, ranCommand } from "../store/console";
import { useStore } from "./useStore";

type Command = string | string[];

function buildArgv(tokens: string[]) {
  return yargs(tokens)
    .scriptName("compcon")
    .option("data", { default: "fixtures/profile.compcon" })
    .command("compendium", "compendium", {})
    .command("pilots", "pilots", {}).argv;
}

function tokenizeCommand(command: Command): string[] {
  return typeof command === "string" ? command.split(/\ +/) : command;
}

function useLogger() {
  const { store } = useStore();

  return {
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

export function useRunCommand(command: Command) {
  const { store } = useStore();
  const goTo = useGoTo();
  const logger = useLogger();

  const tokens = tokenizeCommand(command);
  const argvP = buildArgv(tokens);

  const logCommand = () => store.dispatch(ranCommand(tokens.join(" ")));

  async function runCommand() {
    const argv = await argvP;

    const [token] = argv._;

    switch (token) {
      case "compendium":
        goTo([{ name: "compendium" }]);
        logCommand();
        logger.info("Opening compendium.");
        break;
      case "pilots":
        goTo([{ name: "pilots" }]);
        logCommand();
        logger.info("Opening pilot roster.");
        break;
      default:
        logger.error(`Invalid command: ${tokens.join(" ")}`);
        break;
    }
  }

  return {
    runCommand,
  };
}

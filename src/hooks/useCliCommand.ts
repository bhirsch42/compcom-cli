import React, { useEffect } from "react";
import yargs, { Argv } from "yargs";
import { useGoTo } from "../Router";
import { logged, LogType, ranCommand } from "../store/console";
import { useStore } from "./useStore";
import Fuse from "fuse.js";
import { isEmpty } from "ramda";

type Command = string | string[];
type Completion = {
  value: string;
  helpText: string;
};

function buildArgv(tokens: string[]) {
  return yargs(tokens)
    .scriptName("compcon")
    .option("data", {
      default: "fixtures/profile.compcon",
    })
    .command("compendium", "Open the compendium", {})
    .command("pilots", "Open the pilot roster", {});
}

function tokenizeCommand(command: Command): string[] {
  return typeof command === "string" ? command.trim().split(/\ +/) : command;
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
  const [completion, setCompletion] = React.useState<Completion | null>(null);

  const tokens = tokenizeCommand(command);
  const argvP = buildArgv(tokens);

  useEffect(() => {
    argvP.getCompletion(tokens, (...args) => {
      // yargs types and docs are wrong
      const [_err, completions] = args as unknown as [Error | null, string[]];

      const topCompletion =
        isEmpty(tokens) || isEmpty(tokens[0])
          ? null
          : (completions || [])
              .map((completion) => completion.split(":"))
              .map(([value, helpText]) => ({ value, helpText }))
              .find(({ value }) => value.startsWith(tokens.join(" ")));

      if (topCompletion?.value !== completion?.value) {
        setCompletion(topCompletion || null);
      }
    });
  }, [command]);

  const logCommand = (str: string) => store.dispatch(ranCommand(str));

  function handleCommand(token: string) {
    switch (token) {
      case "compendium":
        goTo([{ name: "compendium" }]);
        logCommand(token);
        logger.info("Opening compendium.");
        break;
      case "pilots":
        goTo([{ name: "pilots" }]);
        logCommand(token);
        logger.info("Opening pilot roster.");
        break;
      default:
        logger.error(`Invalid command: ${tokens.join(" ")}`);
        break;
    }
  }

  async function runCommand() {
    const argv = await argvP.argv;
    const [token] = argv._;
    handleCommand(token as string);
  }

  async function runCompletion() {
    completion && handleCommand(completion.value);
  }

  return {
    runCommand,
    runCompletion,
    completion,
  };
}

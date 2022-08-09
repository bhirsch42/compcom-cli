import yargs from "yargs";
import { useGoTo } from "../Router";
import { ranCommand } from "../store/console";
import { useStore } from "./useStore";

export function useRunCommand() {
  const { store } = useStore();
  const goTo = useGoTo();

  async function runCommand(command: string | string[]) {
    const normalizedCommand =
      typeof command === "string" ? command.split(/\ +/) : command;

    store.dispatch(ranCommand(normalizedCommand.join(" ")));

    const argv = await yargs(normalizedCommand)
      .scriptName("compcon")
      .option("data", { default: "fixtures/profile.compcon" })
      .command("compendium", "compendium", {}, () => {
        goTo([{ name: "compendium" }]);
      })
      .command("pilots", "pilots", {}, () => {
        goTo([{ name: "pilots" }]);
      }).argv;
  }

  return {
    runCommand,
  };
}

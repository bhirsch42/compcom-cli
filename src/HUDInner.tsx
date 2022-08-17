import React from "react";
import { Route, useGoTo } from "./Router";
import Compendium from "./Compendium";
import PilotsPage from "./pages/PilotsPage";
import { CommandBuilder, CommandHandler } from "./hooks/useCommandManager";
import { useLogger } from "./hooks/useLogger";
import useRegisterCommands from "./hooks/useRegisterCommands";

const commandBuilder: CommandBuilder = (argv) => {
  return argv
    .command("compendium", "Open the compendium", {})
    .command("pilots", "Open the pilot roster", {});
};

const HUDInner: React.FC = () => {
  const goTo = useGoTo();
  const logger = useLogger();

  const commandHandler: CommandHandler = (token: string) => {
    switch (token) {
      case "compendium":
        goTo([{ name: "compendium" }]);
        logger.info("Opening compendium.");
        return true;
      case "pilots":
        goTo([{ name: "pilots" }]);
        logger.info("Opening pilot roster.");
        return true;
      default:
        return false;
    }
  };

  useRegisterCommands({ commandHandler, commandBuilder });

  return (
    <>
      <Route path="pilots">
        <PilotsPage />
      </Route>
      <Route path="compendium">
        <Compendium />
      </Route>
    </>
  );
};

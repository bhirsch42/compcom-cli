import useCommandManager, { CommandHandlerGroup } from "./useCommandManager";
import { without } from "ramda";
import React from "react";

export default function useRegisterCommands(
  commandHandlerGroup: CommandHandlerGroup
) {
  const { commandHandlerGroups, setCommandHandlerGroups } = useCommandManager();

  React.useEffect(() => {
    setCommandHandlerGroups((state) => [commandHandlerGroup, ...state]);

    return () => {
      setCommandHandlerGroups((state) => {
        return without([commandHandlerGroup], state);
      });
    };
  }, []);
}

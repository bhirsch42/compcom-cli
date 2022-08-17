import useCommandManager, { CommandHandlerGroup } from "./useCommandManager";
import { without } from "ramda";
import React, { DependencyList } from "react";

export default function useRegisterCommands(
  commandHandlerGroup: CommandHandlerGroup
) {
  const { commandHandlerGroups, setCommandHandlerGroups } = useCommandManager();

  React.useEffect(() => {
    setCommandHandlerGroups([commandHandlerGroup, ...commandHandlerGroups]);

    return () => {
      setCommandHandlerGroups(
        without([commandHandlerGroup], commandHandlerGroups)
      );
    };
  }, []);
}

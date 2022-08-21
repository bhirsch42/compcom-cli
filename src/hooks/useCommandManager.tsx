import React, { PropsWithChildren } from "react";
import { Arguments, Argv, CamelCaseKey } from "yargs";
import { always as noop } from "ramda";
import { UseLoggerReturns } from "./useLogger";

type ParsedArgs<T = unknown> = {
  [key in keyof Arguments<T> as key | CamelCaseKey<key>]: Arguments<T>[key];
};

export type CommandBuilder = (argv: Argv) => Argv;
export type CommandHandler = (
  tokens: string,
  ctx: { logger: UseLoggerReturns; yargs: Argv; argv: ParsedArgs }
) => boolean;
export type CommandHandlerGroup = {
  commandBuilder?: CommandBuilder;
  commandHandler: CommandHandler;
  customCompletions?: string[];
};

interface CommandManagerContextProps {
  commandHandlerGroups: CommandHandlerGroup[];
  setCommandHandlerGroups: React.Dispatch<
    React.SetStateAction<CommandHandlerGroup[]>
  >;
}

const DEFAULT_VALUE: CommandManagerContextProps = {
  commandHandlerGroups: [],
  setCommandHandlerGroups: noop,
};

const CommandManagerContext =
  React.createContext<CommandManagerContextProps>(DEFAULT_VALUE);

export const CommandManagerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [commandHandlerGroups, setCommandHandlerGroups] = React.useState<
    CommandHandlerGroup[]
  >([]);

  return (
    <CommandManagerContext.Provider
      value={{ commandHandlerGroups, setCommandHandlerGroups }}
    >
      {children}
    </CommandManagerContext.Provider>
  );
};

export default function useCommandManager() {
  return React.useContext(CommandManagerContext);
}

import React, { PropsWithChildren, useEffect, useLayoutEffect } from "react";
import { Box, render, Text, useStdin } from "ink";
import { Routes } from "./Router";
import Console from "./Console";
import { CompconDataProvider, useCompconData } from "./hooks/useCompconData";
import { StoreProvider, useStore } from "./hooks/useStore";
import { CommandManagerProvider } from "./hooks/useCommandManager";
import { reverse } from "ramda";
import HudRoutes from "./HudRoutes";
import { loadedPilots } from "./store/slices/pilots";
import useRegisterCommands from "./hooks/useRegisterCommands";

const App: React.FC = () => {
  const { isRawModeSupported } = useStdin();
  const compconData = useCompconData();
  const { store } = useStore();

  useRegisterCommands({
    commandBuilder(yargs) {
      return yargs.command(
        "help",
        "See available commands and how to use them"
      );
    },
    commandHandler(_, { yargs, argv, logger }) {
      if (argv.help) {
        yargs.getHelp().then((helpText) => {
          logger.info(helpText);
        });
        return true;
      }

      return false;
    },
  });

  useEffect(() => {
    store.dispatch(loadedPilots(compconData));
  }, []);

  return (
    <Routes
      initRoute={[
        // {
        //   name: "mech-details",
        //   mechId: "d919b8a9-da4e-4d08-a5ed-9d9fb09645ab",
        // },
        {
          name: "pilot-details",
          pilotId: "889b1490-9b49-443e-954f-1bfbb38f99b3",
        },
      ]}
    >
      <Box height={process.stdout.rows - 2}>
        <Box
          width={"100%"}
          alignItems="stretch"
          borderStyle="classic"
          paddingX={1}
          borderColor="greenBright"
        >
          <Box position="absolute" marginTop={-1} marginLeft={2}>
            <Text color="greenBright">// HUD //</Text>
          </Box>
          <HudRoutes />
        </Box>
        <Box
          borderColor="greenBright"
          borderStyle="classic"
          position="relative"
          marginLeft={-1}
          paddingX={1}
        >
          <Box position="absolute" marginTop={-1} marginLeft={2}>
            <Text color="greenBright">// COMMAND //</Text>
          </Box>
          {isRawModeSupported ? (
            <Console />
          ) : (
            <Box borderStyle="single" paddingX={1}>
              <Text>Raw mode not supported. Console disabled.</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Routes>
  );
};

const TOP_LEVEL_CONTEXTS = [
  CompconDataProvider,
  StoreProvider,
  CommandManagerProvider,
];

const TopLevelContexts: React.FC<PropsWithChildren> = ({ children }) => {
  const nestedContexts = reverse(TOP_LEVEL_CONTEXTS).reduce(
    (agg, Context) => <Context>{agg}</Context>,
    children
  );

  return <>{nestedContexts}</>;
};

export default async function runApp() {
  render(
    <TopLevelContexts>
      <App />
    </TopLevelContexts>
  );
}

import React, { PropsWithChildren, useEffect } from "react";
import { Box, render, Text, useStdin } from "ink";
import { Routes } from "./Router";
import Console from "./Console";
import { CompconDataProvider, useCompconData } from "./hooks/useCompconData";
import { StoreProvider, useStore } from "./hooks/useStore";
import { CommandManagerProvider } from "./hooks/useCommandManager";
import { reverse } from "ramda";
import HUDInner from "./HUDInner";
import { loadedPilots } from "./store/slices/pilots";

const App: React.FC = () => {
  const { isRawModeSupported } = useStdin();
  const compconData = useCompconData();
  const { store } = useStore();

  useEffect(() => {
    store.dispatch(loadedPilots(compconData));
  }, []);

  return (
    <Routes initRoute={[{ name: "pilot-roster" }]}>
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
          <HUDInner />
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

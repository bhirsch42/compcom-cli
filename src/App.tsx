import React, { useEffect } from "react";
import { Box, render, Text, useStdin } from "ink";
import Pilot from "./Pilot";
import { Route, Routes } from "./Router";
import Compendium from "./Compendium";
import Console from "./Console";
import { useRunCommand } from "./hooks/useRunCommand";
import { hideBin } from "yargs/helpers";
import { CompconDataProvider, useCompconData } from "./hooks/useCompconData";
import { StoreProvider, useStore } from "./hooks/useStore";

const App: React.FC = () => {
  const { runCommand } = useRunCommand();
  const { isRawModeSupported } = useStdin();
  const compconData = useCompconData();

  const { store, state } = useStore();

  useEffect(() => {
    runCommand(hideBin(process.argv));
  }, []);

  return (
    <Routes initRoute={[{ name: "pilots" }]}>
      <Box>
        <Box flexGrow={1}>
          <Route path="pilots">
            <Box>
              {compconData.pilots.map((pilot) => (
                <Pilot pilot={pilot} key={pilot.id} />
              ))}
            </Box>
          </Route>
          <Route path="compendium">
            <Compendium />
          </Route>
        </Box>
        {isRawModeSupported ? (
          <Console />
        ) : (
          <Box borderStyle="single" paddingX={1}>
            <Text>Raw mode not supported. Console disabled.</Text>
          </Box>
        )}
      </Box>
    </Routes>
  );
};

export default async function runApp() {
  render(
    <CompconDataProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </CompconDataProvider>
  );
}

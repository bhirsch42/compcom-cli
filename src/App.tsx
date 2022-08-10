import React from "react";
import { Box, render, Text, useStdin } from "ink";
import { Route, Routes } from "./Router";
import Compendium from "./Compendium";
import Console from "./Console";
import { CompconDataProvider, useCompconData } from "./hooks/useCompconData";
import { StoreProvider } from "./hooks/useStore";
import PilotPreview from "./PilotPreview";
import PilotsPage from "./pages/PilotsPage";

const App: React.FC = () => {
  const { isRawModeSupported } = useStdin();

  return (
    <Routes initRoute={[{ name: "pilots" }]}>
      <Box height={process.stdout.rows - 2}>
        <Box
          flexGrow={1}
          alignItems="stretch"
          borderStyle="classic"
          paddingX={1}
          borderColor="greenBright"
        >
          <Box position="absolute" marginTop={-1} marginLeft={2}>
            <Text color="greenBright">// HUD //</Text>
          </Box>

          <Route path="pilots">
            <PilotsPage />
          </Route>
          <Route path="compendium">
            <Compendium />
          </Route>
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

export default async function runApp() {
  render(
    <CompconDataProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </CompconDataProvider>
  );
}

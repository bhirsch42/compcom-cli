import React, { PropsWithChildren } from "react";
import { Box, render, Text, useStdin } from "ink";
import { Route, Routes, useGoTo } from "./Router";
import Compendium from "./Compendium";
import Console from "./Console";
import { CompconDataProvider } from "./hooks/useCompconData";
import { StoreProvider } from "./hooks/useStore";
import PilotsPage from "./pages/PilotsPage";
import useCommandManager, {
  CommandBuilder,
  CommandHandler,
  CommandManagerProvider,
} from "./hooks/useCommandManager";
import { reverse } from "ramda";
import { useLogger } from "./hooks/useLogger";
import useRegisterCommands from "./hooks/useRegisterCommands";

const commandBuilder: CommandBuilder = (argv) => {
  return argv
    .command("compendium", "Open the compendium", {})
    .command("pilots", "Open the pilot roster", {});
};

const App: React.FC = () => {
  const { isRawModeSupported } = useStdin();
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

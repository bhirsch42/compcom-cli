import React from "react";
import { Box, DOMElement, Key, Text, useInput, useStdin } from "ink";
import { useRunCommand } from "./hooks/useCliCommand";
import { useStore } from "./hooks/useStore";
import { reverse, slice } from "ramda";
import { Log, LogType } from "./store/console";
import TypeyText from "./TypeyText";

type LogRenderer = (log: Log) => React.ReactNode;

const LogRenderers: Record<LogType, LogRenderer> = {
  [LogType.COMMAND]: (log) => (
    <Text key={log.id}>
      {"> "}
      {log.message}
    </Text>
  ),
  [LogType.INFO]: (log) => (
    <TypeyText key={log.id} dimColor>
      {log.message}
    </TypeyText>
  ),
  [LogType.ERROR]: (log) => (
    <Text key={log.id} color={"red"}>
      {log.message}
    </Text>
  ),
};

const Console: React.FC = () => {
  const { state } = useStore();
  const [userText, setUserText] = React.useState("");
  const { runCommand } = useRunCommand(userText);
  const containerEl = React.useRef<DOMElement>(null);
  const maxLineCount = containerEl.current?.yogaNode?.getComputedHeight() || 5;

  const { setRawMode } = useStdin();

  React.useEffect(() => {
    setRawMode(true);
    return () => {
      setRawMode(false);
    };
  });

  useInput((input, key) => {
    if (key.backspace || key.delete) {
      setUserText(userText.slice(0, userText.length - 1));
    } else if (key.return) {
      if (userText.length > 0) {
        runCommand();
        setUserText("");
      }
    } else {
      setUserText(`${userText}${input}`);
    }
  });

  const logs = reverse(
    slice(
      Math.max(state.console.logs.length - maxLineCount - 2, 0),
      state.console.logs.length,
      state.console.logs
    )
  );

  return (
    <Box
      borderStyle="single"
      paddingX={1}
      width={32}
      height={32}
      flexDirection="column"
      justifyContent="flex-end"
      ref={containerEl}
    >
      <Box flexDirection="column-reverse">
        <Text>
          {"> "}
          {userText}
          {"‸"}
        </Text>
        {logs.map((log) => LogRenderers[log.type](log))}
      </Box>
    </Box>
  );
};

export default Console;

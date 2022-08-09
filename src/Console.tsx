import React from "react";
import { Box, DOMElement, Key, Text, useInput, useStdin } from "ink";
import { useRunCommand } from "./hooks/useRunCommand";
import { useStore } from "./hooks/useStore";
import { reverse, slice } from "ramda";
import { Log, LogType } from "./store/console";

type LogRenderer = (log: Log, key: string | number) => React.ReactNode;

const LogRenderers: Record<LogType, LogRenderer> = {
  [LogType.COMMAND]: (log, key) => (
    <Text key={key}>
      {"> "}
      {log.message}
    </Text>
  ),
};

const Console: React.FC = () => {
  const { state } = useStore();
  const { runCommand } = useRunCommand();
  const [userText, setUserText] = React.useState("");
  const containerEl = React.useRef<DOMElement>(null);
  const maxLineCount = containerEl.current?.yogaNode?.getHeight().value || 5;

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
        runCommand(userText);
        setUserText("");
      }
    } else {
      setUserText(`${userText}${input}`);
    }
  });

  const logs = reverse(
    slice(
      Math.max(state.console.logs.length - maxLineCount, 0),
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
        <Text color={"green"}>
          {"> "}
          {userText}
          {"‸"}
        </Text>
        {logs.map((log, i) => LogRenderers[log.type](log, i))}
      </Box>
    </Box>
  );
};

export default Console;

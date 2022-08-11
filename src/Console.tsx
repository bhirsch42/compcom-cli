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

function sanitizeUserText(str: string) {
  const endsWithSpace = str[str.length - 1] === " ";
  const sanitizedText = str.trim().split(/\ +/).join(" ");
  return `${sanitizedText}${endsWithSpace ? " " : ""}`;
}

const ConsoleInput: React.FC = () => {
  const [userText, setUserText] = React.useState("");
  const { runCommand, runCompletion, completion } = useRunCommand(userText);

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
        completion ? runCompletion() : runCommand();
        setUserText("");
      }
    } else if (key.tab) {
      if (completion) {
        setUserText(completion.value);
      }
    } else {
      setUserText(sanitizeUserText(`${userText}${input}`));
    }
  });

  return (
    <Box>
      <Text>
        {"> "}
        {userText}
        {"‸"}
      </Text>
      <Box position="relative" marginLeft={-1}>
        <Text dimColor>
          {(completion ? completion.value : "").slice(userText.length)}
        </Text>
      </Box>
    </Box>
  );
};

const Console: React.FC = () => {
  const { state } = useStore();
  const containerEl = React.useRef<DOMElement>(null);
  const maxLineCount = containerEl.current?.yogaNode?.getComputedHeight() || 5;

  const logs = reverse(
    slice(
      Math.max(state.console.logs.length - maxLineCount + 2, 0),
      state.console.logs.length,
      state.console.logs
    )
  );

  return (
    <Box
      paddingX={1}
      width={48}
      flexDirection="column"
      justifyContent="flex-end"
      ref={containerEl}
    >
      <Box flexDirection="column-reverse">
        <ConsoleInput />
        {logs.map((log) => LogRenderers[log.type](log))}
      </Box>
    </Box>
  );
};

export default Console;

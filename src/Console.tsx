import React from "react";
import { Box, DOMElement, Text, useInput, useStdin } from "ink";
import { useRunCommand } from "./hooks/useRunCommand";
import { slice } from "ramda";
import { Log, LogType } from "./store/console";
import TypeyText from "./TypeyText";
import useSelector from "./hooks/useSelector";

type LogRenderer = (log: Log) => React.ReactNode;

const LogRenderers: Record<LogType, LogRenderer> = {
  [LogType.COMMAND]: (log) => (
    <Text key={log.id} wrap="truncate">
      {"> "}
      {log.message}
    </Text>
  ),
  [LogType.INFO]: (log) => (
    <TypeyText key={log.id} dimColor wrap="truncate">
      {log.message}
    </TypeyText>
  ),
  [LogType.ERROR]: (log) => (
    <Text key={log.id} color={"red"} wrap="truncate">
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

const LogHistory: React.FC = () => {
  const consoleLogs = useSelector((state) => state.console.logs);
  const containerEl = React.useRef<DOMElement>(null);
  const maxLineCount = containerEl.current?.yogaNode?.getComputedHeight() || 5;

  const logs = slice(
    Math.max(consoleLogs.length - maxLineCount, 0),
    consoleLogs.length,
    consoleLogs
  );

  return (
    <Box
      ref={containerEl}
      flexDirection="column"
      justifyContent="flex-end"
      flexGrow={1}
    >
      {logs.map((log) => {
        return LogRenderers[log.type](log);
      })}
    </Box>
  );
};

const Console: React.FC = () => {
  return (
    <Box
      paddingX={1}
      width={48}
      flexDirection="column"
      justifyContent="flex-end"
      flexGrow={1}
    >
      <LogHistory />
      <ConsoleInput />
    </Box>
  );
};

export default Console;

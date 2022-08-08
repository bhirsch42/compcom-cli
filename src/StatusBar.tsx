import React from "react";
import { Box, Text } from "ink";

const StatusBar: React.FC = () => {
  return (
    <Box>
      <Text color={"yellow"}>
        <Text>█ █ █ █ █ █ </Text>
        <Text dimColor>█ █ █ █ █ █</Text>
      </Text>
    </Box>
  );
};

export StatusBar

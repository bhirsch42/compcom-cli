import { Box } from "ink";
import React, { PropsWithChildren } from "react";
import TypeyText from "./TypeyText";

const BoxWithLabel: React.FC<PropsWithChildren<{ label: string }>> = ({
  label,
  children,
}) => (
  <Box borderStyle="round" marginTop={1} flexDirection="column">
    <Box position="absolute" marginTop={-1} marginLeft={1}>
      <TypeyText>// {label} //</TypeyText>
    </Box>
    {children}
  </Box>
);

export default BoxWithLabel;

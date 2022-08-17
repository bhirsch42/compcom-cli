import React from "react";
import { Text, Box, Newline, BoxProps } from "ink";
import TypeyText from "./TypeyText";

const Section: React.FC<
  React.PropsWithChildren<{ title?: JSX.Element | string } & BoxProps>
> = ({ title, children, ...boxProps }) => {
  return (
    <Box flexDirection="column" paddingTop={1} {...boxProps}>
      {title && (
        <TypeyText backgroundColor={"blackBright"} color={"white"} bold>
          {" "}
          {title}{" "}
        </TypeyText>
      )}

      {children}
    </Box>
  );
};

export default Section;

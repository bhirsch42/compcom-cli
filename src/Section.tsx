import React from "react";
import { Text, Box, Newline } from "ink";
import TypeyText from "./TypeyText";

const Section: React.FC<
  React.PropsWithChildren<{ title?: JSX.Element | string }>
> = ({ title, children }) => {
  return (
    <Box flexDirection="column" paddingTop={1}>
      {title && (
        <TypeyText backgroundColor={"blue"} color={"white"}>
          {" "}
          {title}{" "}
        </TypeyText>
      )}

      {children}
    </Box>
  );
};

export default Section;

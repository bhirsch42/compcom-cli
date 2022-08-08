import React from "react";
import { Text, Box, Newline } from "ink";

const Section: React.FC<
  React.PropsWithChildren<{ title?: JSX.Element | string }>
> = ({ title, children }) => {
  return (
    <Box flexDirection="column" paddingTop={1}>
      {title && (
        <Text backgroundColor={"blue"} color={"white"}>
          {" "}
          {title}{" "}
        </Text>
      )}

      {children}
    </Box>
  );
};

export default Section;

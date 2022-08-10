import { Box, Text } from "ink";
import { transpose } from "ramda";
import React from "react";
import TypeyText from "./TypeyText";

const Table: React.FC<{ rows: (JSX.Element | string | number)[][] }> = ({
  rows,
}) => {
  const columns = transpose(rows);

  return (
    <Box>
      {columns.map((column, i) => {
        const isLastColumn = i === columns.length - 1;
        return (
          <Box
            paddingRight={isLastColumn ? 0 : 2}
            flexDirection="column"
            key={i}
          >
            {column.map((cell, j) => (
              <TypeyText key={j}>{cell}</TypeyText>
            ))}
          </Box>
        );
      })}
    </Box>
  );
  // <Box>
  //   <Box paddingRight={2} flexDirection={"column"}>
  //     <Text>Name:</Text>
  //     <Text>Level:</Text>
  //     <Text>HP:</Text>
  //     <Text>Grit:</Text>
  //     <Text>E-Defense:</Text>
  //     <Text>Speed:</Text>
  //   </Box>
  //   <Box flexDirection={"column"}>
  //     <Text>{pilot.name}</Text>
  //     <Text>{pilot.level}</Text>
  //     <Text>
  //       {pilot.current_hp}/{maxHp}
  //     </Text>
  //     <Text>+{grit}</Text>
  //     <Text>{eDefense}</Text>
  //     <Text>{speed}</Text>
  //   </Box>
  // </Box>;
};

export default Table;

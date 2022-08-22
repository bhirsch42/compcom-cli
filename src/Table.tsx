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
            {column.map((cell, j) => {
              if (typeof cell === "number" || typeof cell === "string")
                return <TypeyText key={j}>{cell}</TypeyText>;

              return cell;
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export default Table;

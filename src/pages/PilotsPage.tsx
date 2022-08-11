import React, { useEffect } from "react";
import { Box, Text } from "ink";
import PilotPreview from "../PilotPreview";
import { useCompconData } from "../hooks/useCompconData";
import Header from "../Header";

const PilotsPage: React.FC = () => {
  const compconData = useCompconData();

  return (
    <Box alignItems="flex-start" flexGrow={1} flexDirection="column">
      <Box
        alignSelf="flex-end"
        marginBottom={2}
        width="100%"
        height="100%"
        position="absolute"
        justifyContent="center"
        alignItems="center"
      >
        <Header
          text="P I  L O T S"
          dimColor
          color="blackBright"
          font="colossal"
        />
      </Box>

      <Box>
        {compconData.pilots.map((pilot) => (
          <PilotPreview pilot={pilot} key={pilot.id} />
        ))}
      </Box>
    </Box>
  );
};

export default PilotsPage;

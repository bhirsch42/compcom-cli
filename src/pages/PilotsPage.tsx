import React, { useEffect } from "react";
import { Box, Text } from "ink";
import PilotPreview from "../PilotPreview";
import { useCompconData } from "../hooks/useCompconData";
import Header from "../Header";

const PilotsPage: React.FC = () => {
  const compconData = useCompconData();

  return (
    <Box alignItems="flex-start" flexGrow={1} flexDirection="column">
      <Box justifyContent="center" width="100%">
        <Header text=">>> PILOTS <<<" color="magenta" key="pilot-header" />
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

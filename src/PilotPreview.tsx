import React from "react";
import { Box, Text } from "ink";
import { ImportedPilot } from "./types/Pilot";
import { last } from "ramda";
import lancerData from "./types/lancer-data";

const { rules, frames } = lancerData;

const PilotPreview: React.FC<{ pilot: ImportedPilot }> = ({ pilot }) => {
  const grit = Math.ceil(pilot.level / 2);
  const maxHp = rules.base_pilot_hp + grit;
  const eDefense = rules.base_pilot_edef;
  const speed = rules.base_pilot_speed;

  const pilotInfoRows = [
    ["Name:", pilot.name],
    ["Callsign:", pilot.callsign],
    ["Level:", pilot.level],
    ["HP:", `${pilot.current_hp}/${maxHp}`],
    ["Grit:", `+${grit}`],
    ["E-Defense:", eDefense],
    ["Speed:", speed],
  ];

  const activeMech =
    pilot.mechs.find(({ active }) => active) || last(pilot.mechs);

  const frame = frames.find((frame) => frame.id === activeMech?.frame);

  return (
    <Box paddingX={1} borderStyle={"classic"}>
      <Box borderStyle="classic" marginLeft={-2} marginY={-1} paddingX={1}>
        <Text>1</Text>
      </Box>
      <Box paddingX={1}>
        <Box flexDirection="column">
          <Text bold>{pilot.callsign}</Text>
          <Text>
            {pilot.name} // STATUS [{pilot.status.toUpperCase()}] // LL:{" "}
            {pilot.level}
          </Text>
          <Text>
            {frame?.name} [{activeMech?.name}]
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PilotPreview;

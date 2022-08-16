import React from "react";
import { Box, Text } from "ink";
import lancerData from "lancer-data";
import { Pilot } from "./types/Pilot";
import Skill from "./Skill";
import PilotGear from "./PilotGear";
import Section from "./Section";
import Table from "./Table";
import License from "./License";
import TypeyText from "./TypeyText";
import { last } from "ramda";

const { rules, frames } = lancerData;

const PilotPreview: React.FC<{ pilot: Pilot }> = ({ pilot }) => {
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
      <Box
        borderStyle="classic"
        marginLeft={-2}
        marginY={-1}
        paddingX={1}
        alignItems={"center"}
      >
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

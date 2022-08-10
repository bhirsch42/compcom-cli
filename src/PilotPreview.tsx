import React from "react";
import { Box } from "ink";
import lancerData from "lancer-data";
import { Pilot } from "./types/Pilot";
import Skill from "./Skill";
import PilotGear from "./PilotGear";
import Section from "./Section";
import Table from "./Table";
import License from "./License";
import TypeyText from "./TypeyText";

const { rules } = lancerData;

const PilotPreview: React.FC<{ pilot: Pilot }> = ({ pilot }) => {
  const grit = Math.ceil(pilot.level / 2);
  const maxHp = rules.base_pilot_hp + grit;
  const eDefense = rules.base_pilot_edef;
  const speed = rules.base_pilot_speed;

  const [counter, setCounter] = React.useState(0);

  const pilotInfoRows = [
    ["Name:", pilot.name],
    ["Callsign:", pilot.callsign],
    ["Level:", pilot.level + counter],
    ["HP:", `${pilot.current_hp}/${maxHp}`],
    ["Grit:", `+${grit}`],
    ["E-Defense:", eDefense],
    ["Speed:", speed],
  ];

  return (
    <Box flexDirection="column" paddingX={1} borderStyle={"single"}>
      <Table rows={pilotInfoRows} />
    </Box>
  );
};

export default PilotPreview;

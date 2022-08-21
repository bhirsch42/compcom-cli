import React from "react";
import { Box, Text } from "ink";
import Skill from "./Skill";
import PilotGear from "./PilotGear";
import Section from "./Section";
import Table from "./Table";
import License from "./License";
import TypeyText from "./TypeyText";
import { Pilot } from "./lib/applyBonuses";
const PilotDetail: React.FC<{ pilot: Pilot }> = ({ pilot }) => {
  const pilotInfoRows = [
    ["Name:", pilot.name],
    ["Callsign:", pilot.callsign],
    ["Level:", pilot.level],
    ["Grit:", `+${pilot.grit}`],
  ];

  return (
    <Box flexDirection="column">
      <Table rows={pilotInfoRows} />

      <Box>
        <Section title={" HP "} marginRight={2}>
          <Text>
            {pilot.current_hp}/{pilot.maxHp}
          </Text>
        </Section>
        <Section title={"Armor"} marginRight={2}>
          <Text>{pilot.armor}</Text>
        </Section>
        <Section title={"E-Defense"} marginRight={2}>
          <Text>{pilot.eDefense}</Text>
        </Section>
        <Section title={"Evasion"} marginRight={2}>
          <Text>{pilot.evasion}</Text>
        </Section>
        <Section title={"Speed"} marginRight={2}>
          <Text>{pilot.speed}</Text>
        </Section>
      </Box>

      <Section title={"Skills"}>
        {pilot.skills.map((skill) => (
          <Skill skill={skill} key={skill.id} />
        ))}
      </Section>

      <Box>
        <Section title={"Armor"}>
          {pilot.loadout.armor.map((gear, i) => (
            <PilotGear pilotGear={gear} key={gear ? gear.id : i} />
          ))}
        </Section>

        <Section title={"Weapons"}>
          {pilot.loadout.weapons.map((gear, i) => (
            <PilotGear pilotGear={gear} key={gear ? gear.id : i} />
          ))}
        </Section>

        <Section title={"Gear"}>
          {pilot.loadout.gear.map((gear, i) => (
            <PilotGear pilotGear={gear} key={gear ? gear.id : i} />
          ))}
        </Section>
      </Box>

      <Section title={"Licenses"}>
        {pilot.licenses.map((license) => (
          <License license={license} key={license.id} />
        ))}
      </Section>

      <Section title={"Mechs"}>
        <Box flexDirection="column" paddingLeft={1}>
          {pilot.mechs.map((mech) => (
            <TypeyText key={mech.id}>{mech.name}</TypeyText>
          ))}
        </Box>
      </Section>
    </Box>
  );
};

export default PilotDetail;

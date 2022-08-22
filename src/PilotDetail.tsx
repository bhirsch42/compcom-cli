import React from "react";
import { Box, Text } from "ink";
import Skill from "./Skill";
import PilotGear from "./PilotGear";
import Section from "./Section";
import Table from "./Table";
import License from "./License";
import TypeyText from "./TypeyText";
import { Pilot } from "./store/selectors/selectPilot";

const PilotDetail: React.FC<{ pilot: Pilot }> = ({ pilot }) => {
  const pilotInfoRows = [
    [
      <Text color={"greenBright"}>▛</Text>,
      "NAME",
      pilot.name.toUpperCase(),
      <Text color={"greenBright"}>▜</Text>,
    ],
    [
      <Text color={"greenBright"}>▌</Text>,
      "CALLSIGN",
      pilot.callsign.toUpperCase(),
      <Text color={"greenBright"}>▐</Text>,
    ],
    [
      <Text color={"greenBright"}>▙</Text>,
      "LICENSE LEVEL",
      pilot.level,
      <Text color={"greenBright"}>▟</Text>,
    ],
  ];

  return (
    <Box flexDirection="column">
      <Box>
        <Box flexDirection="column">
          <Box padding={1} paddingX={2}>
            <Table rows={pilotInfoRows} />
          </Box>

          <Box>
            <Section title={" HP "} marginRight={2}>
              <Text>
                {pilot.current_hp}/{pilot.maxHp}
              </Text>
            </Section>
            <Section title={"Grit"} marginRight={2}>
              <Text>{pilot.grit}</Text>
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

        <Box flexDirection="column" paddingRight={2}>
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
      </Box>
    </Box>
  );
};

export default PilotDetail;

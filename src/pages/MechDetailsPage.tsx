import React from "react";
import { Box, Newline, Text } from "ink";
import { useRouter } from "../Router";
import useSelector from "../hooks/useSelector";
import { selectMech } from "../store/selectors/selectMech";
import Table from "../Table";
import Section from "../Section";
import MechTrait from "../MechTrait";
import TypeyText from "../TypeyText";
import MechMount from "../MechMount";
import MechSystem from "../MechSystem";
import BoxWithLabel from "../BoxWithLabel";

const MechDetailsPage: React.FC = () => {
  const { currentPage } = useRouter();

  const mechId = currentPage?.name === "mech-details" && currentPage.mechId;
  const mech = (mechId && useSelector(selectMech(mechId))) || null;

  if (!mech) return <Text>Could not find mech: {mechId}</Text>;

  const mechInfoRows = [["Size", mech.stats.size]];

  const mechResourcesRows = [
    ["Burn", mech.burn, "--"],
    ["Movement", mech.current_move, mech.stats.speed],
    ["Structure", mech.current_structure, mech.stats.structure],
    ["Armor", mech.stats.armor, "N/A"],
    ["HP", mech.current_hp, mech.stats.hp],
    ["Overshield", mech.overshield, "N/A"],
    ["Stress", mech.current_stress, mech.stats.stress],
    ["Heat", mech.current_heat, mech.stats.heatcap],
    ["Repair", mech.current_repairs, mech.stats.repcap],
    ["Overcharge", mech.current_overcharge, "--"],
    ["Core Energy", mech.current_core_energy, mech.maxCoreEnergy],
  ];

  const mechAbilityRows = [
    ["Speed", mech.stats.speed],
    ["Evasion", mech.stats.evasion],
    ["Tech Attack", mech.stats.tech_attack],
    ["Attack Bonus", mech.attackBonus],
    ["E-Defense", mech.stats.edef],
    ["Sensor Range", mech.stats.sensor_range],
    ["Save Target", mech.stats.save],
  ];

  console.log(JSON.stringify(mech));

  return (
    <Box>
      <Box flexDirection="column" marginRight={2}>
        <TypeyText bold italic>
          {mech.frame.name.toUpperCase()} // {mech.name.toUpperCase()}
        </TypeyText>
        <Box>
          <Section title={"Statuses"} marginRight={2}>
            <Text>{mech.statuses.join(", ")}</Text>
          </Section>
          <Section title={"Conditions"} marginRight={2}>
            <Text>{mech.conditions.join(", ")}</Text>
          </Section>
          <Section title={"Resistances"} marginRight={2}>
            <Text>{mech.resistances.join(", ")}</Text>
          </Section>
        </Box>
        <Box>
          <Section title={"Burn"} marginRight={2}>
            <Text>{mech.burn}</Text>
          </Section>
          <Section title={"Movement"} marginRight={2}>
            <Text>
              {mech.current_move}/{mech.stats.speed}
            </Text>
          </Section>
          <Section title={"Structure"} marginRight={2}>
            <Text>
              {mech.current_structure}/{mech.stats.structure}
            </Text>
          </Section>
        </Box>

        <Section title={"Traits"}>
          {mech.frame.traits.map((trait) => (
            <MechTrait trait={trait} key={trait.name} />
          ))}
        </Section>
      </Box>
      <Box flexDirection="column" minWidth={60}>
        <Section title={"Active Loadout"} marginRight={2} paddingTop={0}>
          <BoxWithLabel label="SYSTEMS">
            {mech.activeLoadout.systems.map((system, i) => (
              <MechSystem system={system} key={i} />
            ))}
          </BoxWithLabel>

          {mech.hasIntegratedWeapon && (
            <MechMount mount={mech.activeLoadout.integratedWeapon} />
          )}

          {mech.activeLoadout.mounts.map((mount, i) => (
            <MechMount mount={mount} key={i} />
          ))}
        </Section>
      </Box>
    </Box>
  );
};

export default MechDetailsPage;

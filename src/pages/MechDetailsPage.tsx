import React from "react";
import { Box, Newline, Text } from "ink";
import { useRouter } from "../Router";
import useSelector from "../hooks/useSelector";
import { selectMech } from "../store/selectors/selectMech";
import Table from "../Table";

const MechDetailsPage: React.FC = () => {
  const { currentPage } = useRouter();

  const mechId = currentPage?.name === "mech-details" && currentPage.mechId;
  const mech = (mechId && useSelector(selectMech(mechId))) || null;

  if (!mech) return <Text>Could not find mech: {mechId}</Text>;

  const mechInfoRows = [
    ["ID", mech.id],
    ["Name", mech.name],
    ["Statuses", mech.statuses.join(", ")],
    ["Conditions", mech.conditions.join(", ")],
    ["Resistances", mech.resistances.join(", ")],
  ];

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
  ];

  return (
    <Box flexDirection="column">
      <Table rows={mechInfoRows} />
      <Newline />
      <Table rows={mechResourcesRows} />
      <Newline />
      <Table rows={mechAbilityRows} />
    </Box>
  );
};

export default MechDetailsPage;

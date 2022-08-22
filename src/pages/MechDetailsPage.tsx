import React from "react";
import { Box, Text } from "ink";
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
    ["Burn", mech.burn],
    ["Movement", mech.current_move],
    ["Structure", mech.current_structure],
    ["Armor", "TODO"],
    ["HP", mech.current_hp],
    ["Overshield", mech.overshield],
    ["Stress", mech.current_stress],
    ["Heat", mech.current_heat],
    ["Repair", mech.current_repairs],
    ["Overcharge", mech.current_overcharge],
    ["Core Energy", mech.current_core_energy],
    ["Speed", mech.frame.stats.speed || ""],
    ["Evasion", mech.frame.stats.evasion || ""],
  ];

  return (
    <Box>
      <Table rows={mechInfoRows} />
    </Box>
  );
};

export default MechDetailsPage;
